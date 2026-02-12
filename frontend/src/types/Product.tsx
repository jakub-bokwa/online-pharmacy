export type Product = {
	id: number | string;
	name: string;
	description?: string;
	manufacturer: string;
	price: number;
};

export type Products = Product[];
