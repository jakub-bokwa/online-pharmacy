import { useState, useEffect } from "react";
import { Navbar, Content } from "./Components";
import productsArray from "../products.json";
import type { Products, SortDirection } from "./types";
import { sortAscending, sortDescending } from "./utils/sorting";

const App = () => {
  const [products, setProducts] = useState<Products>([]);
  const [sortingMode, setSortingMode] = useState<SortDirection>("default");

  useEffect(() => {
    setProducts(productsArray);
  }, []);

  const closeDropdown = () => {
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleSort = () => {
    if (sortingMode === "default") {
      setSortingMode("ascending");
      setProducts(sortAscending(productsArray));
    } else if (sortingMode === "ascending") {
      setSortingMode("descending");
      setProducts(sortDescending(productsArray));
    } else {
      setSortingMode("default");
      setProducts([...productsArray]);
    }
  };

  return (
    <>
      <Navbar />
      <Content>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-accent btn-outline btn-sm m-1">
            Sort by price: {sortingMode}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a
                onClick={() => {
                  setSortingMode("default");
                  setProducts([...productsArray]);
                  closeDropdown();
                }}>
                Default
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSortingMode("ascending");
                  setProducts(sortAscending(productsArray));
                  closeDropdown();
                }}>
                Ascending
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setSortingMode("descending");
                  setProducts(sortDescending(productsArray));
                  closeDropdown();
                }}>
                Descending
              </a>
            </li>
          </ul>
        </div>
        <ul>
          {products.map((product, idx) => {
            return (
              <li key={product.id}>
                {idx + 1} - {product.name} -
                {product.description
                  ? ` ${product.description} `
                  : " No product description provided "}
                - {product.manufacturer} - {product.price}
              </li>
            );
          })}
        </ul>
      </Content>
    </>
  );
};

export default App;
