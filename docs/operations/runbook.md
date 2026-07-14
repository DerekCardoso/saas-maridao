# Runbook

## Smoke checklist

- `/v1/health` returns `ok`.
- Client can sign up and access protected routes.
- Provider can create a pending profile.
- Admin can approve a provider.
- Search returns only approved providers.
- WhatsApp link opens with normalized phone and prefilled message.
- Client can create an appointment and the provider can change status.
- Completed appointment accepts one review only.
- Stripe Checkout returns to the Premium page.
- Stripe webhook replay is idempotent.

## Incident response

1. Capture the request ID, user role and approximate time.
2. Check Railway logs by request ID.
3. Check Sentry for grouped frontend/API errors.
4. If billing is affected, compare local subscription state with Stripe before changing data.
5. Record any manual admin override in the admin panel with a reason.

## Rollback

Rollback API first when a backend release causes user-facing failures. Rollback web first when a frontend release breaks navigation or forms. Database rollbacks must be explicit migrations, never destructive manual edits in production.
