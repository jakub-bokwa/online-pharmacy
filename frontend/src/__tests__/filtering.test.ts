import { describe, it, expect } from "vitest";
import { filterProducts, getManufacturers } from "../utils/filtering";
import type { Products } from "../types";

const products: Products = [
  { id: 1, name: "Aspirin", description: "Pain reliever", manufacturer: "PharmaCorp", price: 10 },
  { id: 2, name: "Ibuprofen", description: "Anti-inflammatory", manufacturer: "MedLife", price: 20 },
  { id: 3, name: "Paracetamol", description: "Fever reducer", manufacturer: "PharmaCorp", price: 15 },
  { id: 4, name: "Omeprazole", description: "Treats heartburn", manufacturer: "HealthPlus", price: 25 },
];

const allManufacturers = new Set(["PharmaCorp", "MedLife", "HealthPlus"]);

describe("filterProducts", () => {
  it("returns all products when no filters are applied", () => {
    const result = filterProducts(products, "", allManufacturers);
    expect(result).toHaveLength(4);
  });

  it("filters by product name (case-insensitive)", () => {
    const result = filterProducts(products, "aspirin", allManufacturers);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Aspirin");
  });

  it("filters by description", () => {
    const result = filterProducts(products, "heartburn", allManufacturers);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Omeprazole");
  });

  it("filters by manufacturer", () => {
    const result = filterProducts(products, "", new Set(["PharmaCorp"]));
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.manufacturer === "PharmaCorp")).toBe(true);
  });

  it("combines search and manufacturer filters", () => {
    const result = filterProducts(products, "pain", new Set(["PharmaCorp"]));
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Aspirin");
  });

  it("returns empty array when no manufacturers selected", () => {
    const result = filterProducts(products, "", new Set());
    expect(result).toHaveLength(0);
  });
});

describe("getManufacturers", () => {
  it("returns unique manufacturers sorted alphabetically", () => {
    const result = getManufacturers(products);
    expect(result).toEqual(["HealthPlus", "MedLife", "PharmaCorp"]);
  });

  it("returns empty array for empty products", () => {
    const result = getManufacturers([]);
    expect(result).toEqual([]);
  });
});
