import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, UserPlus } from "lucide-react";

import { useRole } from "@/context/RoleContext";
import ModeratorSelectionModal from "./ModeratorSelectionModal";
import PaginationControls from "./PaginationControls"; // Adjust path if needed based on your folder structure

const TicketTable = ({ tickets = [], pagination, onPageChange }) => {
  const navigate = useNavigate();
  const { isAdmin, isModerator, isLabAssistant } = useRole();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Open modal
  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-x-auto w-full">
        <Table className="min-w-[700px] md:min-w-full">
          {/* Header */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-center">Ticket Details</TableHead>

              {(isAdmin || isModerator) && <TableHead>Assigned By</TableHead>}
              {(isAdmin || isLabAssistant) && <TableHead>Assigned To</TableHead>}
              {(isAdmin || isLabAssistant) && (
                <TableHead className="text-center">Assign To</TableHead>
              )}

              <TableHead className="text-right hidden md:table-cell">
                Created By
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => {
                const statusStr = ticket.status?.toLowerCase() || "";
                
                return (
                  <TableRow
                    key={ticket._id}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {ticket.title}
                    </TableCell>

                    {/* Fixed Status Badge with proper In-Progress support */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${
                          statusStr === "open"
                            ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                            : statusStr === "in-progress" || statusStr === "in_progress"
                            ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                            : statusStr === "resolved"
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                            : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                        }`}
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`badge-${ticket.priority?.toLowerCase()} text-xs capitalize`}
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>

                    {/* View Ticket */}
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/tickets/${ticket._id}`)}
                        className="hover:bg-blue-500/10 text-blue-500"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </Button>
                    </TableCell>

                    {/* Assigned By */}
                    {(isAdmin || isModerator) && (
                      <TableCell className="text-muted-foreground text-xs">
                        {ticket.assignedByLabAssistant?.name || "—"}
                      </TableCell>
                    )}

                    {/* Assigned To */}
                    {(isAdmin || isLabAssistant) && (
                      <TableCell className="text-muted-foreground text-xs">
                        {ticket.assignedModerator?.name || "Unassigned"}
                      </TableCell>
                    )}

                    {/* Assign Button */}
                    {(isAdmin || isLabAssistant) && (
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenModal(ticket)}
                          className="h-8 border-dashed border-primary/50 hover:border-primary text-primary"
                        >
                          <UserPlus className="h-3.5 w-3.5 mr-1" />
                          {ticket.assignedModerator ? "Reassign" : "Assign"}
                        </Button>
                      </TableCell>
                    )}

                    {/* Created By */}
                    <TableCell className="text-right text-muted-foreground text-xs hidden md:table-cell">
                      {ticket.createdBy?.name || "System"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground text-sm">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Modal with ticketId passed properly */}
        <ModeratorSelectionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          ticketId={selectedTicket?._id}
          isReassign={!!selectedTicket?.assignedModerator}
        />
      </div>
    </div>
  );
};

export default TicketTable;