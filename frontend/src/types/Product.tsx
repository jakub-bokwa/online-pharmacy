export type Product = {
  id: number | string;
  name: string;
  description?: string;
  manufacturer: string;
  price: number;
};

export type Products = Product[];

export type ProductListProps = {
  products: Products;
};

export type ProductItemProps = {
  product: Product;
  index: number;
};
