import { useState } from "react";
import { Navbar, Content, SortDropdown, ProductList } from "./Components";
import productsArray from "../products.json";
import type { Products, SortDirection } from "./types";
import { sortAscending, sortDescending } from "./utils/sorting";

const App = () => {
  const [sortingMode, setSortingMode] = useState<SortDirection>("default");

  const displayProducts: Products =
    sortingMode === "ascending"
      ? sortAscending(productsArray)
      : sortingMode === "descending"
        ? sortDescending(productsArray)
        : [...productsArray];

  return (
    <>
      <Navbar />
      <Content>
        <SortDropdown sortingMode={sortingMode} onSortChange={setSortingMode} />
        <ProductList products={displayProducts} />
      </Content>
    </>
  );
};

export default App;
