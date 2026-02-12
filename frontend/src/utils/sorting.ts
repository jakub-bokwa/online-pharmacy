import type { Products } from "../types";

const sortByPrice = (
	unsortedProducts: Products,
	direction: "ascending" | "descending",
) => {
	const sortedProducts = [...unsortedProducts].sort((a, b) =>
		direction === "ascending" ? a.price - b.price : b.price - a.price,
	);

	return sortedProducts;
};

export { sortByPrice };
