import { useState, useEffect } from "react";
import { Navbar, Content, SortDropdown, ProductList } from "./Components";
import productsArray from "../products.json";
import type { Products, SortDirection } from "./types";
import { sortAscending, sortDescending } from "./utils/sorting";

const App = () => {
  const [products, setProducts] = useState<Products>([]);
  const [sortingMode, setSortingMode] = useState<SortDirection>("default");

  useEffect(() => {
    setProducts(productsArray);
  }, []);

  const handleSortChange = (direction: SortDirection) => {
    setSortingMode(direction);
    if (direction === "ascending") {
      setProducts(sortAscending(productsArray));
    } else if (direction === "descending") {
      setProducts(sortDescending(productsArray));
    } else {
      setProducts([...productsArray]);
    }
  };

  return (
    <>
      <Navbar />
      <Content>
        <SortDropdown sortingMode={sortingMode} onSortChange={handleSortChange} />
        <ProductList products={products} />
      </Content>
    </>
  );
};

export default App;
