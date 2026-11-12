import { Sparkles, User, Clock, Tag, MessageSquare, ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTickets } from "@/context/TicketsContext";
import { useRole } from "@/context/RoleContext";
import BackBtn from "@/components/tickets/BackBtn";
import ModeratorSelectionModal from "@/components/tickets/ModeratorSelectionModal";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, getTicketById, updateTicketByModerator } = useTickets();
  const { isAdmin, isLabAssistant, isModerator, role } = useRole();

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local state for comment & status updates
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("open");
  const [submitting, setSubmitting] = useState(false);

  // Find the current ticket from global state
  const ticket = tickets.find((t) => t._id === id);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const loadInitialTicket = async () => {
      try {
        await getTicketById(id);
      } catch (err) {
        console.error("Failed to load ticket:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialTicket();

    const pollInterval = 10000;
    const poll = async () => {
      try {
        await getTicketById(id);
      } catch (err) {
        console.error("Polling error:", err);
      } finally {
        if (isMounted) {
          timeoutId = setTimeout(poll, pollInterval);
        }
      }
    };

    timeoutId = setTimeout(poll, pollInterval);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id, getTicketById]);

  // Sync comment and status once ticket loads or updates
  useEffect(() => {
    if (ticket) {
      setComment(ticket.comment || "");
      setStatus(ticket.status || "open");
    }
  }, [ticket]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await updateTicketByModerator(ticket._id, { comment, status });
      if (res.success) {
        alert("Ticket updated successfully 🟢");
      } else {
        alert(res.message || "Failed to update ❌");
      }
    } catch (error) {
      console.error("Error saving ticket update:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading ticket...
      </div>
    );
  }

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  // Permission rules
  const isStudent = role === "student";
  const isClosed = ticket.status === "closed";
  const canEditCommentsAndStatus = !isStudent && (!isClosed || isAdmin || isLabAssistant);
  const canAssignModal = isAdmin || isLabAssistant;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-10">
      {/* Back + Title */}
      <div className="flex items-start gap-4 mb-8">
        <BackBtn />
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">{ticket.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">Ticket ID: {ticket._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description, AI Analysis & Comments Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {ticket.description}
            </p>
          </div>

          {/* Comments & Status Modification Panel (Editable for all except student, locked if closed unless admin/lab_assistant) */}
          <div className="glass-panel border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Moderator Feedback & Status</h2>
            </div>

            {isClosed && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded">
                This ticket is closed and locked from standard modifications 🔒
              </div>
            )}

            {canEditCommentsAndStatus ? (
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Comment / Notes</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Add notes, debugging steps, or resolution details..."
                    className="w-full bg-input/50 border border-border rounded-md p-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Update Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-input/50 border border-border rounded-md p-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed (Terminal State)</option>
                  </select>
                </div>

                <Button type="submit" disabled={submitting} size="sm">
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">Comment:</span>
                  <p className="mt-1 bg-muted/30 p-3 rounded border border-border">
                    {ticket.comment || "No comments added yet."}
                  </p>
                </div>
                {isStudent && (
                  <p className="text-xs italic">Note: Comments and status updates are editable by staff and moderators only.</p>
                )}
              </div>
            )}
          </div>

          {/* AI Analysis Section */}
          <div className="glass-panel border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-primary">AI Analysis</h2>
              </div>
              <Button onClick={() => console.log("Generating AI analysis")} size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Analysis
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
              {ticket.aiSummary ? (
                <div className="w-full text-left text-foreground leading-relaxed whitespace-pre-line">
                  {ticket.aiSummary}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <Sparkles className="w-10 h-10 mb-4 opacity-40 animate-pulse" />
                  <p className="text-sm">
                    Click <span className="text-foreground font-medium">"Generate Analysis"</span> for AI insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Meta Details & Assignment Action */}
        <div className="space-y-6">
          <div className="glass-panel border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Details</h2>
            <div className="space-y-5">
              <DetailRow
                label="Status"
                value={
                  <Badge className={`badge-${ticket.status.toLowerCase()} border capitalize`}>
                    {ticket.status}
                  </Badge>
                }
              />
              <DetailRow
                label="Priority"
                value={
                  <Badge className={`badge-${ticket.priority.toLowerCase()} border capitalize`}>
                    {ticket.priority}
                  </Badge>
                }
              />
              <DetailRow
                icon={<User className="w-4 h-4" />}
                label="Assigned To"
                value={
                  <div className="flex items-center gap-2">
                    <span>{ticket.assignedModerator?.name || "Unassigned"}</span>
                    {canAssignModal && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsModalOpen(true)}
                        className="h-7 px-2 border-dashed border-primary/50 text-primary text-xs"
                      >
                        <UserPlus className="w-3 h-3 mr-1" />
                        {ticket.assignedModerator ? "Reassign" : "Assign"}
                      </Button>
                    )}
                  </div>
                }
              />
              <DetailRow
                icon={<Clock className="w-4 h-4" />}
                label="Created"
                value={new Date(ticket.createdAt).toLocaleDateString()}
              />
            </div>
          </div>

          <div className="glass-panel border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4" />
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {ticket.tags?.length ? (
                ticket.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No tags</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Moderator Selection Modal */}
      <ModeratorSelectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        ticketId={ticket._id}
        isReassign={!!ticket.assignedModerator}
      />
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-right font-medium text-sm">{value}</div>
    </div>
  );
}