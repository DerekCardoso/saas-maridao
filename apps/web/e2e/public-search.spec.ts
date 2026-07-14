import { expect, test } from "@playwright/test"

test("public search renders approved providers from the API", async ({ page }) => {
  await page.route("**/v1/categories", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify([{ id: "cat-eletrica", name: "Eletrica", slug: "eletrica" }])
    })
  })

  await page.route("**/v1/providers/search?**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        data: [
          {
            id: "provider-1",
            displayName: "Carlos Reparos",
            city: "Sao Paulo",
            state: "SP",
            rating: 4.8,
            reviewCount: 32,
            isPremium: true,
            basePriceCents: 12000,
            distanceKm: 3.2,
            whatsapp: "5511999999999",
            avatarUrl: null,
            categories: [{ id: "cat-eletrica", name: "Eletrica", slug: "eletrica" }]
          }
        ],
        pagination: { page: 1, limit: 12, total: 1, totalPages: 1 }
      })
    })
  })

  await page.goto("/")

  await expect(page.getByRole("heading", { name: /Encontre um profissional/i })).toBeVisible()
  await expect(page.getByRole("link", { name: "Carlos Reparos", exact: true })).toBeVisible()
  await expect(page.getByText("Premium")).toBeVisible()
})
