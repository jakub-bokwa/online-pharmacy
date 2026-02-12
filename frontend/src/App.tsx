import { useState, useEffect } from "react";
import { Navbar, Content } from "./Components";
import productsArray from "../products.json";
import type { Products, SortDirection } from "./types";
import { sortByPrice } from "./utils/sorting";

const App = () => {
	const [products, setProducts] = useState<Products>([]);
	const [sortingMode, setSortingMode] = useState<SortDirection>("default");

	useEffect(() => {
		setProducts(productsArray);
	}, []);

	const handleSort = () => {
		if (sortingMode === "default") {
			setSortingMode("ascending");
			setProducts(sortByPrice(productsArray, "ascending"));
		} else if (sortingMode === "ascending") {
			setSortingMode("descending");
			setProducts(sortByPrice(productsArray, "descending"));
		} else {
			setSortingMode("default");
			setProducts([...productsArray]);
		}
	};

	return (
		<>
			<Navbar />
			<Content>
				<div className="flex justify-end">
					<button
						className="btn btn-accent btn-outline btn-sm"
						onClick={handleSort}
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
