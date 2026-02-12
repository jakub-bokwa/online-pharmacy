import type { ProductItemProps } from "../types";

export const ProductItem = ({ product, index }: ProductItemProps) => {
  return (
    <li key={product.id}>
      {index + 1} - {product.name} -
      {product.description
        ? ` ${product.description} `
        : " No product description provided "}
      - {product.manufacturer} - {product.price}
    </li>
  );
};
