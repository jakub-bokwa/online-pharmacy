import type { Products } from "../types";

const sortAscending = (unsortedProducts: Products) => {
	const sortedProducts = [...unsortedProducts].sort(
		(a, b) => a.price - b.price,
	);
	return sortedProducts;
};

const sortDescending = (unsortedProducts: Products) => {
	const sortedProducts = [...unsortedProducts].sort(
		(a, b) => b.price - a.price,
	);
	return sortedProducts;
};

export { sortAscending, sortDescending };
