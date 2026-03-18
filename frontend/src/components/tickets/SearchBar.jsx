// src/components/tickets/filters/SearchBar.jsx
import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search tickets..."
      className="w-full p-2 bg-[#0d1117] border border-gray-700 rounded-md focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
