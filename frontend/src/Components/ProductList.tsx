import type { ProductListProps } from "../types";

export const ProductList = ({ products }: ProductListProps) => {
  return (
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
  );
};
