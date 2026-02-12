import type { SortDropdownProps } from "../types";

const closeDropdown = () => {
  (document.activeElement as HTMLElement)?.blur();
};

export const SortDropdown = ({ sortingMode, onSortChange }: SortDropdownProps) => {
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-accent btn-outline btn-sm m-1">
        Sort by price: {sortingMode}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <a
            onClick={() => {
              onSortChange("default");
              closeDropdown();
            }}>
            Default
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onSortChange("ascending");
              closeDropdown();
            }}>
            Ascending
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onSortChange("descending");
              closeDropdown();
            }}>
            Descending
          </a>
        </li>
      </ul>
    </div>
  );
};
