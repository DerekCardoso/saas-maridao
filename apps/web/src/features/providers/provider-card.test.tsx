import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { ProviderCard } from "./provider-card"

describe("ProviderCard", () => {
  it("shows premium status and creates a direct WhatsApp contact", () => {
    render(
      <MemoryRouter>
        <ProviderCard
          provider={{
            id: "provider-id",
            displayName: "Joao Eletricista",
            city: "Sao Paulo",
            state: "SP",
            rating: 4.9,
            reviewCount: 42,
            isPremium: true,
            basePriceCents: 15000,
            distanceKm: 3.2,
            whatsapp: "11999999999",
            categories: [{ id: "category", name: "Eletrica", slug: "eletrica" }]
          }}
        />
      </MemoryRouter>
    )

    const whatsappLink = screen.getByRole("link", { name: /whatsapp/i })

    expect(screen.getByText("Premium")).not.toBeNull()
    expect(whatsappLink.getAttribute("href")).toContain("wa.me/5511999999999")
  })
})
