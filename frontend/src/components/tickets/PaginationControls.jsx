import React from "react";

const PaginationControls = ({ page, totalPages, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-2 bg-gray-700 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-gray-300">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-2 bg-gray-700 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default  PaginationControls;
