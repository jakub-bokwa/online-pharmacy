import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { SearchBarProps } from "../types";

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
      <input
        type="text"
        className="grow"
        placeholder="Search by name or description..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </label>
  );
};
