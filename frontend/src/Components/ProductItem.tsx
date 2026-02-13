import type { ProductItemProps } from "../types";

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="card card-compact bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-base">{product.name}</h2>
        <p className="text-sm text-base-content/60">
          {product.description}
        </p>
        <div className="card-actions justify-between items-center mt-2">
          <span className="badge badge-outline">{product.manufacturer}</span>
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
