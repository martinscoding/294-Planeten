import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PlanetDetail from "../components/PlanetDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("PlanetDetail", () => {
  it("zeigt Planetendetails an", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            content: {
              planetName: "Mars",
              distanceToEarth: 225,
              galaxy: "Milchstraße",
              mass: 10,
              imageUrl: "https://example.com/mars.jpg",
            },
          }),
      })
    );

    render(
      <MemoryRouter initialEntries={["/planet/123"]}>
        <Routes>
          <Route path="/planet/:id" element={<PlanetDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Mars")).toBeDefined();
    expect(screen.getByText("Galaxie: Milchstraße")).toBeDefined();
  });
});
