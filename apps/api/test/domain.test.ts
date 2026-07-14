import { describe, expect, it } from "vitest"
import { calculateReputation } from "../src/reviews/reputation"
import { rankProviders } from "../src/search/ranking"
import { generateHourlySlots } from "../src/availability/slots"
import { mapStripeSubscriptionStatus } from "../src/billing/stripe-status"

describe("provider ranking", () => {
  it("prioritizes premium, then rating, reviews, distance and activity", () => {
    const result = rankProviders([
      {
        id: "regular",
        isPremium: false,
        rating: 5,
        reviewCount: 100,
        distanceKm: 1,
        lastActiveAt: new Date("2030-01-01")
      },
      {
        id: "premium",
        isPremium: true,
        rating: 4.6,
        reviewCount: 20,
        distanceKm: 10,
        lastActiveAt: new Date("2029-12-01")
      }
    ])

    expect(result.map((provider) => provider.id)).toEqual(["premium", "regular"])
  })
})

describe("availability slots", () => {
  it("creates one-hour UTC slots and excludes blocked intervals", () => {
    const slots = generateHourlySlots({
      date: "2030-01-07",
      timeZone: "America/Sao_Paulo",
      startTime: "09:00",
      endTime: "12:00",
      blocked: [{ startsAt: "2030-01-07T13:00:00.000Z", endsAt: "2030-01-07T14:00:00.000Z" }]
    })

    expect(slots).toEqual([
      "2030-01-07T12:00:00.000Z",
      "2030-01-07T14:00:00.000Z"
    ])
  })
})

describe("reputation", () => {
  it("ignores hidden reviews", () => {
    expect(
      calculateReputation([
        { rating: 5, status: "visible" },
        { rating: 1, status: "hidden" },
        { rating: 3, status: "flagged" }
      ])
    ).toEqual({ rating: 4, reviewCount: 2 })
  })
})

describe("Stripe status mapping", () => {
  it("maps unpaid subscriptions to past_due", () => {
    expect(mapStripeSubscriptionStatus("unpaid")).toBe("past_due")
  })

  it("maps canceled subscriptions to cancelled", () => {
    expect(mapStripeSubscriptionStatus("canceled")).toBe("cancelled")
  })
})
