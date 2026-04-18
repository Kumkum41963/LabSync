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

const TicketTable = ({ tickets }) => {
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
          {tickets.map((ticket) => (
            <TableRow
              key={ticket._id}
              className="hover:bg-primary/5 transition-colors"
            >
              <TableCell className="font-medium max-w-[200px] truncate">
                {ticket.title}
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={`badge-${ticket.status.toLowerCase()} text-xs capitalize`}
                >
                  {ticket.status}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className={`badge-${ticket.priority.toLowerCase()} text-xs capitalize`}
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
          ))}
        </TableBody>
      </Table>

      {/* Modal (display only for now) */}
      <ModeratorSelectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        isReassign={!!selectedTicket?.assignedModerator}
      />
    </div>
  );
};

export default TicketTable;