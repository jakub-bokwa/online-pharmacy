import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import type { Products } from "../types";

const mockProducts: Products = [
  { id: 1, name: "Aspirin", description: "Pain reliever", manufacturer: "PharmaCorp", price: 30 },
  { id: 2, name: "Ibuprofen", description: "Anti-inflammatory", manufacturer: "MedLife", price: 10 },
  { id: 3, name: "Paracetamol", description: "Fever reducer", manufacturer: "PharmaCorp", price: 20 },
];

beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockProducts),
  } as Response);
});

describe("App integration", () => {
  it("loads and displays products from the API", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Aspirin")).toBeInTheDocument();
    });
    expect(screen.getByText("Ibuprofen")).toBeInTheDocument();
    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
  });

  it("filters products by search query", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Aspirin")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search by name or description..."), {
      target: { value: "pain" },
    });

    expect(screen.getByText("Aspirin")).toBeInTheDocument();
    expect(screen.queryByText("Ibuprofen")).not.toBeInTheDocument();
    expect(screen.queryByText("Paracetamol")).not.toBeInTheDocument();
  });

  it("shows warning when no products match filters", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Aspirin")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Search by name or description..."), {
      target: { value: "nonexistent" },
    });

    expect(screen.getByText("No products match your current filters.")).toBeInTheDocument();
  });

  it("shows error when fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });
});
