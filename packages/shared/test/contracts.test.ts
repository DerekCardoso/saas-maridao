import { describe, expect, it } from "vitest"
import {
  appointmentTransitionSchema,
  buildWhatsAppUrl,
  createAppointmentSchema,
  getPremiumVisibility,
  providerProfileSchema,
  providerSearchSchema
} from "../src/index"

describe("provider contracts", () => {
  it("rejects an invalid provider work radius", () => {
    const result = providerProfileSchema.safeParse({
      displayName: "Joao Eletricista",
      whatsapp: "11999999999",
      bio: "Instalacoes e reparos.",
      basePriceCents: 15000,
      cep: "01001000",
      city: "Sao Paulo",
      state: "SP",
      latitude: -23.5505,
      longitude: -46.6333,
      serviceCategoryIds: ["67c7536d-4101-4f6d-9545-a93c9af04063"],
      workRadiusKm: 101
    })

    expect(result.success).toBe(false)
  })

  it("coerces provider search pagination", () => {
    const result = providerSearchSchema.parse({ page: "2", limit: "12", radiusKm: "30" })
    expect(result).toMatchObject({ page: 2, limit: 12, radiusKm: 30 })
  })
})

describe("appointment contracts", () => {
  it("accepts a future ISO appointment", () => {
    const result = createAppointmentSchema.safeParse({
      providerId: "f3aa4fa1-1983-4f30-9085-c7aac926dc95",
      serviceCategoryId: "67c7536d-4101-4f6d-9545-a93c9af04063",
      scheduledFor: "2030-01-15T13:00:00.000Z",
      notes: "Trocar duas tomadas."
    })

    expect(result.success).toBe(true)
  })

  it("enforces role based appointment transitions", () => {
    expect(
      appointmentTransitionSchema.safeParse({
        currentStatus: "pending",
        nextStatus: "confirmed",
        actorRole: "provider"
      }).success
    ).toBe(true)

    expect(
      appointmentTransitionSchema.safeParse({
        currentStatus: "completed",
        nextStatus: "pending",
        actorRole: "client"
      }).success
    ).toBe(false)
  })
})

describe("WhatsApp", () => {
  it("normalizes Brazilian phone and pre-fills the message", () => {
    const url = buildWhatsAppUrl({
      phone: "(11) 99999-9999",
      clientName: "Derek",
      serviceName: "Eletrica",
      scheduledFor: "15/01 as 10h"
    })

    expect(url).toContain("https://wa.me/5511999999999")
    expect(decodeURIComponent(url)).toContain("Derek")
    expect(decodeURIComponent(url)).toContain("Eletrica")
  })
})

describe("Premium visibility", () => {
  it("keeps cancelled subscriptions active until period end", () => {
    expect(
      getPremiumVisibility({
        status: "cancelled",
        currentPeriodEnd: new Date("2030-01-01T00:00:00.000Z"),
        now: new Date("2029-12-01T00:00:00.000Z")
      })
    ).toBe(true)
  })

  it("removes visibility for past due subscriptions", () => {
    expect(
      getPremiumVisibility({
        status: "past_due",
        currentPeriodEnd: new Date("2030-01-01T00:00:00.000Z"),
        now: new Date("2029-12-01T00:00:00.000Z")
      })
    ).toBe(false)
  })
})
