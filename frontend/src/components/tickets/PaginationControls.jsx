import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({ page, totalPages, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
        <span className="text-sm font-medium">
          Page <span className="text-primary font-semibold">{page}</span> of <span className="text-primary font-semibold">{totalPages}</span>
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="gap-2"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PaginationControls;
