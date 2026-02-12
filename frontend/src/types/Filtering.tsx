export type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export type ManufacturerFilterProps = {
  manufacturers: string[];
  selectedManufacturers: Set<string>;
  onManufacturerChange: (manufacturer: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
};
