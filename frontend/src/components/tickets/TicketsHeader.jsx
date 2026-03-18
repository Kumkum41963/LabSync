import React from "react";
import SearchBar from "@/components/tickets/SearchBar";
import FilterDropdown from "@/components/tickets/FilterDropdown";
import SortDropdown from "@/components/tickets/SortDropdown";

const TicketsHeader = ({ params, setParams }) => {
  return (
    <div className="w-full bg-[#06404b37] p-4 rounded-lg mb-6 flex flex-col gap-4">{/* Peacock/Turquoise background */}

      {/* 🔍 Search */}
      <div className="relative w-full">
        <SearchBar
          value={params.search}
          onChange={(value) => setParams((p) => ({ ...p, search: value, page: 1 }))}
          className="pl-20" // extra padding for icon
        />
      </div>

      {/* 🧩 Filters (Status / Priority / Tag / Assigned) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <FilterDropdown
          label="Status"
          value={params.status}
          options={["open", "in_progress", "resolved", "closed"]}
          onChange={(value) => setParams((p) => ({ ...p, status: value, page: 1 }))}
        />

        <FilterDropdown
          label="Priority"
          value={params.priority}
          options={["low", "medium", "high"]}
          onChange={(value) => setParams((p) => ({ ...p, priority: value, page: 1 }))}
        />

        <FilterDropdown
          label="Assigned"
          value={params.assigned}
          options={[
            { value: "true", label: "Assigned" },
            { value: "false", label: "Not Assigned" },
          ]}
          onChange={(value) =>
            setParams((p) => ({ ...p, assigned: value, page: 1 }))
          }
        />

        <FilterDropdown
          label="Tag"
          value={params.tag}
          options={[]}
          onChange={(value) => setParams((p) => ({ ...p, tag: value, page: 1 }))}
        />
      </div>

      {/* ❌ Reset */}
      <button
        onClick={() =>
          setParams({
            search: "",
            status: "",
            priority: "",
            tag: "",
            assigned: "",
            sort: "createdAt-desc",
            page: 1,
            limit: 6,
          })
        }
        className="bg-[#0fa4a3] hover:bg-[#0c8b8a] text-white py-2 px-3 rounded-md text-sm self-start"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default TicketsHeader;
