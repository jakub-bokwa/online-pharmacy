import type { ProductListProps } from "../types";
import { ProductItem } from "./ProductItem";

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
