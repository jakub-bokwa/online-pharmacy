import type { Products } from "../types";

const filterProducts = (
  products: Products,
  searchQuery: string,
  selectedManufacturers: Set<string>,
): Products => {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      query === "" ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    const matchesManufacturer = selectedManufacturers.has(product.manufacturer);

    return matchesSearch && matchesManufacturer;
  });
};

const getManufacturers = (products: Products): string[] =>
  [...new Set(products.map((product) => product.manufacturer))].sort();

export { filterProducts, getManufacturers };
