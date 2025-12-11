import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PlanetList from "../components/PlanetList";
import { MemoryRouter } from "react-router-dom";

describe("PlanetList", () => {
  it("lädt und zeigt Planeten an", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { _id: "1", content: { planetName: "Erde" } },
          ]),
      })
    );

    render(
      <MemoryRouter>
        <PlanetList />
      </MemoryRouter>
    );

    expect(await screen.findByText("Erde")).toBeDefined();
  });
});
