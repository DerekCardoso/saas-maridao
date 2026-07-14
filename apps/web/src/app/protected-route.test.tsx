import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { ProtectedRoute } from "./protected-route"

describe("ProtectedRoute", () => {
  it("denies a client from provider-only content", () => {
    render(
      <MemoryRouter>
        <ProtectedRoute
          sessionState="authenticated"
          user={{ id: "id", email: "client@example.com", role: "client", isBlocked: false }}
          allowedRoles={["provider"]}
        >
          <div>Provider area</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.queryByText("Provider area")).toBeNull()
    expect(screen.getByText(/acesso/i)).not.toBeNull()
  })
})
