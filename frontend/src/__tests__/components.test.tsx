import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductItem } from "../Components/ProductItem";
import { ProductList } from "../Components/ProductList";
import { SearchBar } from "../Components/SearchBar";
import { SortDropdown } from "../Components/SortDropdown";
import { ManufacturerFilter } from "../Components/ManufacturerFilter";
import type { Product } from "../types";

const mockProduct: Product = {
  id: 1,
  name: "Aspirin",
  description: "Pain reliever and fever reducer",
  manufacturer: "PharmaCorp",
  price: 42.04,
};

describe("ProductItem", () => {
  it("renders product name, description, manufacturer, and price", () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText("Aspirin")).toBeInTheDocument();
    expect(screen.getByText("Pain reliever and fever reducer")).toBeInTheDocument();
    expect(screen.getByText("PharmaCorp")).toBeInTheDocument();
    expect(screen.getByText("$42.04")).toBeInTheDocument();
  });
});

describe("ProductList", () => {
  it("renders multiple products", () => {
    const products = [
      mockProduct,
      { ...mockProduct, id: 2, name: "Ibuprofen", price: 10.5 },
    ];
    render(<ProductList products={products} />);
    expect(screen.getByText("Aspirin")).toBeInTheDocument();
    expect(screen.getByText("Ibuprofen")).toBeInTheDocument();
  });
});

describe("SearchBar", () => {
  it("renders with the current search query", () => {
    render(<SearchBar searchQuery="aspirin" onSearchChange={() => {}} />);
    expect(screen.getByDisplayValue("aspirin")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", () => {
    const onChange = vi.fn();
    render(<SearchBar searchQuery="" onSearchChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search by name or description..."), {
      target: { value: "test" },
    });
    expect(onChange).toHaveBeenCalledWith("test");
  });
});

describe("SortDropdown", () => {
  it("displays the current sorting mode", () => {
    render(<SortDropdown sortingMode="ascending" onSortChange={() => {}} />);
    expect(screen.getByText("Sort by price: ascending")).toBeInTheDocument();
  });
});

describe("ManufacturerFilter", () => {
  const manufacturers = ["HealthPlus", "MedLife", "PharmaCorp"];
  const allSelected = new Set(manufacturers);

  it("displays the manufacturer count", () => {
    render(
      <ManufacturerFilter
        manufacturers={manufacturers}
        selectedManufacturers={allSelected}
        onManufacturerChange={() => {}}
        onToggleAll={() => {}}
      />,
    );
    expect(screen.getByText("Manufacturers (3/3)")).toBeInTheDocument();
  });

  it("shows Select all as checked when all are selected", () => {
    render(
      <ManufacturerFilter
        manufacturers={manufacturers}
        selectedManufacturers={allSelected}
        onManufacturerChange={() => {}}
        onToggleAll={() => {}}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked(); // Select all
  });
});
