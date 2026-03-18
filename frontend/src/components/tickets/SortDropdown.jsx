// src/components/tickets/filters/SortDropdown.jsx
import React from "react";

const SortDropdown = ({ value, onChange }) => {
  const options = [
    { value: "createdAt-desc", label: "Newest First" },
    { value: "createdAt-asc", label: "Oldest First" },
    { value: "priority-desc", label: "High Priority First" },
    { value: "priority-asc", label: "Low Priority First" },
  ];

  return (
    <div className="flex flex-col gap-1 w-full sm:w-64">
      <label className="text-sm text-gray-400">Sort By</label>
      <select
        className="p-2 bg-[#0d1117] border border-gray-700 rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
