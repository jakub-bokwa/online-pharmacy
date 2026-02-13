import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { SearchBarProps } from "../types";

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      <input
        type="text"
        className="grow"
        placeholder="Search by name or description..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button onClick={() => onSearchChange("")} className="btn btn-ghost btn-xs btn-circle">
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </label>
  );
};
