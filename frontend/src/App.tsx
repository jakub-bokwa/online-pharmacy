import { useState, useEffect } from "react";
import {
  Navbar,
  Content,
  SortDropdown,
  ProductList,
  SearchBar,
  ManufacturerFilter,
} from "./Components";
import type { Products, SortDirection } from "./types";
import { sortAscending, sortDescending } from "./utils/sorting";
import { filterProducts, getManufacturers } from "./utils/filtering";

const App = () => {
  const [products, setProducts] = useState<Products>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortingMode, setSortingMode] = useState<SortDirection>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState(
    () => new Set<string>(),
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data: Products = await response.json();
        const manufacturerList = getManufacturers(data);

        setProducts(data);
        setManufacturers(manufacturerList);
        setSelectedManufacturers(new Set(manufacturerList));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    products,
    searchQuery,
    selectedManufacturers,
  );

  const displayProducts: Products =
    sortingMode === "ascending"
      ? sortAscending(filteredProducts)
      : sortingMode === "descending"
        ? sortDescending(filteredProducts)
        : [...filteredProducts];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Content>
          <div role="alert" className="alert alert-error">
            <span>Failed to load products: {error}</span>
          </div>
        </Content>
      </>
    );
  }

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
        {displayProducts.length === 0 ? (
          <div role="alert" className="alert alert-warning">
            <span>No products match your current filters.</span>
          </div>
        ) : (
          <ProductList products={displayProducts} />
        )}
      </Content>
    </>
  );
};

export default App;
