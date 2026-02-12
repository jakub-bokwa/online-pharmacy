import type { ManufacturerFilterProps } from "../types";

export const ManufacturerFilter = ({
  manufacturers,
  selectedManufacturers,
  onManufacturerChange,
  onToggleAll,
}: ManufacturerFilterProps) => {
  const allSelected = selectedManufacturers.size === manufacturers.length;

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-accent btn-outline btn-sm m-1">
        Manufacturers ({selectedManufacturers.size}/{manufacturers.length})
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-56 p-2 shadow-sm">
        <li>
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={allSelected}
              onChange={(e) => onToggleAll(e.target.checked)}
            />
            <span className="label-text font-medium">Select all</span>
          </label>
        </li>
        <div className="divider my-0" />
        {manufacturers.map((manufacturer) => (
          <li key={manufacturer}>
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={selectedManufacturers.has(manufacturer)}
                onChange={(e) =>
                  onManufacturerChange(manufacturer, e.target.checked)
                }
              />
              <span className="label-text">{manufacturer}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
