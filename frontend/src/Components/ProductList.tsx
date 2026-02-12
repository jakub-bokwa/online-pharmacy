import type { ProductListProps } from "../types";
import { ProductItem } from "./ProductItem";

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul>
      {products.map((product, idx) => (
        <ProductItem key={product.id} product={product} index={idx} />
      ))}
    </ul>
  );
};
