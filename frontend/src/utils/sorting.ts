import type { Products } from "../types";

const sortAscending = (products: Products) =>
  [...products].sort((a, b) => a.price - b.price);

const sortDescending = (products: Products) =>
  [...products].sort((a, b) => b.price - a.price);

export { sortAscending, sortDescending };
