import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException
} from "@nestjs/common"
import Stripe from "stripe"
import { getPremiumVisibility } from "@maridao/shared"
import type { AuthUser } from "../auth/auth-user"
import { DatabaseService } from "../database/database.service"
import { mapStripeSubscriptionStatus } from "./stripe-status"

@Injectable()
export class BillingService {
  private readonly stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-06-24.dahlia" })
    : null

  constructor(private readonly database: DatabaseService) {}

  async createCheckout(user: AuthUser, input: { successPath: string; cancelPath: string }) {
    const stripe = this.requireStripe()
    const provider = await this.getProvider(user.id)
    const customerId = await this.ensureCustomer(stripe, provider)
    const priceId = process.env.STRIPE_PREMIUM_PRICE_ID
    if (!priceId) throw new ServiceUnavailableException("Preco Premium nao configurado.")

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.WEB_URL}${input.successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_URL}${input.cancelPath}`,
      subscription_data: {
        metadata: { providerId: provider.id }
      },
      metadata: { providerId: provider.id }
    })

    return { url: session.url }
  }

  async createPortal(user: AuthUser) {
    const stripe = this.requireStripe()
    const provider = await this.getProvider(user.id)
    const subscription = await this.database.pool.query(
      "select stripe_customer_id from subscriptions where provider_id = $1",
      [provider.id]
    )
    const customerId = subscription.rows[0]?.stripe_customer_id
    if (!customerId) throw new NotFoundException("Assinatura nao encontrada.")

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.WEB_URL}/provider/premium`
    })
    return { url: session.url }
  }

  async getMine(userId: string) {
    const provider = await this.getProvider(userId)
    const result = await this.database.pool.query(
      "select * from subscriptions where provider_id = $1",
      [provider.id]
    )
    return result.rows[0] ?? { status: "inactive", providerId: provider.id }
  }

  async handleWebhook(rawBody: Buffer, signature: string | undefined) {
    const stripe = this.requireStripe()
    const secret = process.env.STRIPE_WEBHOOK_SECRET
    if (!secret || !signature) throw new BadRequestException("Webhook sem assinatura.")

    const event = stripe.webhooks.constructEvent(rawBody, signature, secret)
    const inserted = await this.database.pool.query(
      `insert into stripe_events (id, type) values ($1, $2)
       on conflict (id) do nothing returning id`,
      [event.id, event.type]
    )
    if (!inserted.rows[0]) return { duplicate: true }

    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      await this.syncSubscription(event.data.object)
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      if (typeof session.subscription === "string") {
        await this.syncSubscription(await stripe.subscriptions.retrieve(session.subscription))
      }
    }

    return { received: true }
  }

  private async syncSubscription(subscription: Stripe.Subscription) {
    const providerId = subscription.metadata.providerId
    if (!providerId) return

    const status = mapStripeSubscriptionStatus(subscription.status)
    const currentPeriodEndSeconds = subscription.items.data
      .map((item) => item.current_period_end)
      .sort((left, right) => right - left)[0]
    const currentPeriodEnd = currentPeriodEndSeconds
      ? new Date(currentPeriodEndSeconds * 1000)
      : null
    const isPremium = getPremiumVisibility({ status, currentPeriodEnd })

    await this.database.pool.query(
      `insert into subscriptions (
        provider_id, stripe_customer_id, stripe_subscription_id, status,
        current_period_end, cancel_at_period_end, updated_at
      ) values ($1, $2, $3, $4, $5, $6, now())
      on conflict (provider_id) do update set
        stripe_customer_id = excluded.stripe_customer_id,
        stripe_subscription_id = excluded.stripe_subscription_id,
        status = excluded.status,
        current_period_end = excluded.current_period_end,
        cancel_at_period_end = excluded.cancel_at_period_end,
        updated_at = now()`,
      [
        providerId,
        typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
        subscription.id,
        status,
        currentPeriodEnd,
        subscription.cancel_at_period_end
      ]
    )
    await this.database.pool.query(
      `update provider_profiles set is_premium =
        case when exists (
          select 1 from subscriptions s
          where s.provider_id = provider_profiles.id and s.override_enabled = true
        ) then true else $2 end,
        updated_at = now()
       where id = $1`,
      [providerId, isPremium]
    )
  }

  private async ensureCustomer(
    stripe: Stripe,
    provider: { id: string; email: string; displayName: string }
  ) {
    const result = await this.database.pool.query(
      "select stripe_customer_id from subscriptions where provider_id = $1",
      [provider.id]
    )
    if (result.rows[0]?.stripe_customer_id) return result.rows[0].stripe_customer_id as string

    const customer = await stripe.customers.create({
      email: provider.email,
      name: provider.displayName,
      metadata: { providerId: provider.id }
    })
    await this.database.pool.query(
      `insert into subscriptions (provider_id, stripe_customer_id)
       values ($1, $2)
       on conflict (provider_id) do update set stripe_customer_id = excluded.stripe_customer_id`,
      [provider.id, customer.id]
    )
    return customer.id
  }

  private async getProvider(userId: string) {
    const result = await this.database.pool.query(
      `select pp.id, pp.display_name, p.email
       from provider_profiles pp join profiles p on p.id = pp.user_id
       where pp.user_id = $1`,
      [userId]
    )
    if (!result.rows[0]) throw new NotFoundException("Perfil profissional nao encontrado.")
    return {
      id: result.rows[0].id as string,
      email: result.rows[0].email as string,
      displayName: result.rows[0].display_name as string
    }
  }

  private requireStripe() {
    if (!this.stripe) throw new ServiceUnavailableException("Stripe nao configurado.")
    return this.stripe
  }
}
