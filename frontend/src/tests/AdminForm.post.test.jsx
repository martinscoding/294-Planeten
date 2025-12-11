import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import AdminForm from "../components/AdminForm";
import { MemoryRouter } from "react-router-dom";

describe("AdminForm POST", () => {
  it("sendet POST Request bei gültigen Eingaben", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({ ok: true })
    );
    global.fetch = mockFetch;

    render(
      <MemoryRouter>
        <AdminForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Planet Name"), {
      target: { value: "Neptun" },
    });
    fireEvent.change(screen.getByPlaceholderText("Distanz zur Erde"), {
      target: { value: "300" },
    });
    fireEvent.change(screen.getByPlaceholderText("Galaxie"), {
      target: { value: "Milchstraße" },
    });
    fireEvent.change(screen.getByPlaceholderText("Masse"), {
      target: { value: "17" },
    });
    fireEvent.change(screen.getByPlaceholderText("Bild-URL"), {
      target: { value: "https://example.com/neptun.jpg" },
    });

    fireEvent.click(screen.getByText("Speichern"));

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch.mock.calls[0][0]).toBe("http://localhost:8080/api/planets");
  });
});
