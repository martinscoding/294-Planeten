import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AdminForm from "../components/AdminForm";
import { MemoryRouter } from "react-router-dom";

describe("AdminForm Validation", () => {
  it("zeigt Fehlermeldungen bei leeren Eingaben", async () => {
    render(
      <MemoryRouter>
        <AdminForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Speichern"));

    expect(await screen.findByText("Name darf nicht leer sein")).toBeDefined();
    expect(screen.getByText("Distanz muss > 0 sein")).toBeDefined();
  });
});
