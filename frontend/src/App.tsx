import { useState } from "react";
import {
  Navbar,
  Content,
  SortDropdown,
  ProductList,
  SearchBar,
  ManufacturerFilter,
} from "./Components";
import productsArray from "../products.json";
import type { Products, SortDirection } from "./types";
import { sortAscending, sortDescending } from "./utils/sorting";
import { filterProducts, getManufacturers } from "./utils/filtering";

const manufacturers = getManufacturers(productsArray);

const App = () => {
  const [sortingMode, setSortingMode] = useState<SortDirection>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState(
    () => new Set(manufacturers),
  );

  const handleManufacturerChange = (manufacturer: string, checked: boolean) => {
    setSelectedManufacturers((prev) => {
      const next = new Set(prev);
      checked ? next.add(manufacturer) : next.delete(manufacturer);
      return next;
    });
  };

  const handleToggleAll = (checked: boolean) =>
    setSelectedManufacturers(checked ? new Set(manufacturers) : new Set());

  const filteredProducts = filterProducts(
    productsArray,
    searchQuery,
    selectedManufacturers,
  );

  const displayProducts: Products =
    sortingMode === "ascending"
      ? sortAscending(filteredProducts)
      : sortingMode === "descending"
        ? sortDescending(filteredProducts)
        : [...filteredProducts];

  return (
    <>
      <Navbar />
      <Content>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <div className="flex gap-2">
            <ManufacturerFilter
              manufacturers={manufacturers}
              selectedManufacturers={selectedManufacturers}
              onManufacturerChange={handleManufacturerChange}
              onToggleAll={handleToggleAll}
            />
            <SortDropdown
              sortingMode={sortingMode}
              onSortChange={setSortingMode}
            />
          </div>
        </div>
        <ProductList products={displayProducts} />
      </Content>
    </>
  );
};

export default App;
