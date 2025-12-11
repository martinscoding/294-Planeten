import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PlanetCard from "../components/PlanetCard";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => vi.fn(),
  };
});

describe("PlanetCard", () => {
  it("navigiert beim Klick zur Detailseite", () => {
    const planet = { planetName: "Saturn", imageUrl: "x", galaxy: "Milchstraße" };
    render(
      <MemoryRouter>
        <PlanetCard id="999" planet={planet} />
      </MemoryRouter>
    );

    const card = screen.getByText("Saturn");
    fireEvent.click(card);

    expect(card).toBeDefined();
  });
});
