import { HeartIcon } from "@heroicons/react/20/solid";

export const Navbar = () => {
	return (
		<nav className="navbar bg-base-100 shadow-sm layout-padding">
			<div className="flex text-xl cursor-pointer gap-x-1">
				<HeartIcon className="h-8 w-8 text-error" />
				<span className="mb-0.5">Pharmacy Online</span>
			</div>
		</nav>
	);
};
