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

	const handleSort = (unsortedProducts: Products) => {
		if (sortingMode === "default") {
			setSortingMode("asc");
			setProducts(sortAscending(unsortedProducts));
		} else if (sortingMode === "asc") {
			setSortingMode("desc");
			setProducts(sortDescending(unsortedProducts));
		} else {
			setSortingMode("default");
			setProducts(productsArray);
		}
		// const sortedProducts = [...productsArray].sort((a, b) => {
		// 	if (a.price < b.price) {
		// 		return -1;
		// 	}
		// 	if (a.price > b.price) {
		// 		return 1;
		// 	}
		// 	return 0;
		// });

		// setProducts(sortedProducts);
		// console.log(sortedProducts);
	};

	return (
		<>
			<Navbar />
			<Content>
				<div className="flex justify-end">
					<button
						className="btn btn-accent btn-outline btn-sm"
						onClick={() => {
							handleSort(products);
						}}
					>
						SORT BY: {sortingMode}
					</button>
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
