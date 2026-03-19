import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TicketsHeader({ params, setParams }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          value={params.search}
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
          className="pl-9"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3">
        {/* Status */}
        <Select
          value={params.status}
          onValueChange={(value) =>
            setParams((prev) => ({ ...prev, status: value, page: 1 }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select
          value={params.priority}
          onValueChange={(value) =>
            setParams((prev) => ({ ...prev, priority: value, page: 1 }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={params.sort}
          onValueChange={(value) =>
            setParams((prev) => ({ ...prev, sort: value }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Newest First</SelectItem>
            <SelectItem value="createdAt-asc">Oldest First</SelectItem>
            <SelectItem value="priority-desc">Priority High → Low</SelectItem>
            <SelectItem value="priority-asc">Priority Low → High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}