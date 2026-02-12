export type SortDirection = "default" | "ascending" | "descending";

export type SortDropdownProps = {
	sortingMode: SortDirection;
	onSortChange: (direction: SortDirection) => void;
};
