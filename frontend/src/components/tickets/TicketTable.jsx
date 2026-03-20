import React from "react";
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

const TicketTable = ({ tickets, role }) => {
    const navigate = useNavigate();

    // Helper variables for cleaner code
    const isAdmin = role === "admin";
    const isMod = role === "moderator";
    const isLab = role === "lab_assistant";

    return (
        <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-x-auto w-full">
            <Table className="min-w-[700px] md:min-w-full">
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[200px] md:w-[300px]">Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="hidden sm:table-cell">Tags</TableHead>

                        {/* Admin sees both. Mod ONLY sees Assigned By. */}
                        {(isAdmin || isMod) && <TableHead>Assigned By</TableHead>}

                        {/* Admin sees both. Lab ONLY sees Assigned To. */}
                        {(isAdmin || isLab) && <TableHead>Assigned To</TableHead>}

                        <TableHead className="text-right hidden md:table-cell">Created By</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow
                            key={ticket._id}
                            className="cursor-pointer hover:bg-primary/5 transition-colors group"
                            onClick={() => navigate(`/tickets/${ticket._id}`)}
                        >
                            <TableCell className="font-medium text-foreground">
                                <div className="truncate max-w-[150px] md:max-w-none">
                                    {ticket.title}
                                </div>
                            </TableCell>

                            <TableCell>
                                <Badge variant="outline" className={`badge-${ticket.status.toLowerCase()} text-xs capitalize`}>
                                    {ticket.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <Badge variant="outline" className={`badge-${ticket.priority.toLowerCase()} text-xs capitalize`}>
                                    {ticket.priority}
                                </Badge>
                            </TableCell>

                            <TableCell className="hidden sm:table-cell">
                                <div className="flex flex-wrap gap-1">
                                    {ticket.tags?.slice(0, 1).map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </TableCell>

                            {/* Data Logic: Assigned By (Visible to Admin & Mod) */}
                            {(isAdmin || isMod) && (
                                <TableCell className="text-muted-foreground text-xs">
                                    {ticket.assignedByLabAssistant?.name || "—"}
                                </TableCell>
                            )}

                            {/* Data Logic: Assigned To (Visible to Admin & Lab) */}
                            {(isAdmin || isLab) && (
                                <TableCell className="text-muted-foreground text-xs">
                                    {ticket.assignedModerator?.name || "Unassigned"}
                                </TableCell>
                            )}

                            <TableCell className="text-right text-muted-foreground text-xs hidden md:table-cell">
                                {ticket.createdBy?.name || "System"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TicketTable;