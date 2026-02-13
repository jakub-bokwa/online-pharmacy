import { describe, it, expect } from "vitest";
import { sortAscending, sortDescending } from "../utils/sorting";
import type { Products } from "../types";

const products: Products = [
  { id: 1, name: "B", description: "desc", manufacturer: "M1", price: 30 },
  { id: 2, name: "A", description: "desc", manufacturer: "M2", price: 10 },
  { id: 3, name: "C", description: "desc", manufacturer: "M1", price: 20 },
];

describe("sortAscending", () => {
  it("sorts products by price low to high", () => {
    const result = sortAscending(products);
    expect(result.map((p) => p.price)).toEqual([10, 20, 30]);
  });

  it("does not mutate the original array", () => {
    const result = sortAscending(products);
    expect(result).not.toBe(products);
    expect(products[0].price).toBe(30);
  });
});

describe("sortDescending", () => {
  it("sorts products by price high to low", () => {
    const result = sortDescending(products);
    expect(result.map((p) => p.price)).toEqual([30, 20, 10]);
  });

  it("does not mutate the original array", () => {
    const result = sortDescending(products);
    expect(result).not.toBe(products);
    expect(products[0].price).toBe(30);
  });
});
