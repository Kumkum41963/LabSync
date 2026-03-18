import React from "react";

const FilterDropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 bg-[#0d1117] border border-gray-700 rounded-md"
      >
        <option value="">All</option>

        {options.map((item, idx) => {
          const val = typeof item === "string" ? item : item.value;
          const label = typeof item === "string" ? item : item.label;

          return (
            <option key={idx} value={val}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterDropdown;
