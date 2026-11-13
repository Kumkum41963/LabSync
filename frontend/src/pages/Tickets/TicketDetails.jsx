import { Sparkles, User, Clock, Tag, MessageSquare, ShieldCheck, UserPlus, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTickets } from "@/context/TicketsContext";
import { useRole } from "@/context/RoleContext";
import BackBtn from "@/components/tickets/BackBtn";
import ModeratorSelectionModal from "@/components/tickets/ModeratorSelectionModal";
import TicketComments from "@/components/tickets/TicketComments";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, getTicketById, addComment, updateComment, deleteComment } = useTickets();
  const { isAdmin, isLabAssistant, role, currentUser } = useRole();

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local state for adding/editing comments
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        if (isMounted) setLoading(false);
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

  // Role-based profile navigation helper
  const handleProfileClick = (userObj) => {
    if (!userObj?._id) return;
    const targetRole = userObj.role;

    const canView =
      targetRole === "student" ||
      isAdmin ||
      (isLabAssistant && targetRole === "moderator");

    if (canView) {
      navigate(`/profile/${userObj._id}`);
    }
  };

  const renderUserLink = (userObj, fallback = "Unassigned") => {
    if (!userObj) return <span className="text-muted-foreground">{fallback}</span>;

    const targetRole = userObj.role;
    const isClickable =
      targetRole === "student" ||
      isAdmin ||
      (isLabAssistant && targetRole === "moderator");

    if (isClickable) {
      return (
        <button
          type="button"
          onClick={() => handleProfileClick(userObj)}
          className="text-primary hover:underline font-medium cursor-pointer text-xs sm:text-sm"
        >
          {userObj.name}
        </button>
      );
    }

    return <span className="text-xs sm:text-sm">{userObj.name}</span>;
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

  const canAssignModal = isAdmin || isLabAssistant;

  // Consistent Status Styling
  const getStatusBadgeStyle = (st) => {
    switch (st?.toLowerCase()) {
      case "open":
        return "bg-blue-500/15 text-blue-500 border-blue-500/30";
      case "in_progress":
        return "bg-amber-500/15 text-amber-500 border-amber-500/30";
      case "resolved":
        return "bg-emerald-500/15 text-emerald-500 border-emerald-500/30";
      case "closed":
        return "bg-slate-500/15 text-slate-400 border-slate-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <BackBtn />
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">{ticket.title}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              ID: {ticket._id} • Created by {renderUserLink(ticket.createdBy, "System")}
            </p>
          </div>
        </div>
      </div>

      {/* Main 2x2 Wireframe Container */}
      <div className="border border-border/80 rounded-xl p-4 sm:p-6 bg-card/30 space-y-6">

        {/* TOP ROW: Description (Left) & AI Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top-Left: Description */}
          <div className="glass-panel border border-border rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Top-Right: AI Summary */}
          <div className="glass-panel border border-border rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-primary">AI Summary</h2>
                </div>
                <Button onClick={() => console.log("Trigger AI pipeline:", ticket._id)} size="sm" variant="outline">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Generate
                </Button>
              </div>

              {ticket.aiSummary ? (
                <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {ticket.aiSummary}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                  <Sparkles className="w-8 h-8 mb-2 opacity-40" />
                  <p className="text-xs">
                    Click <span className="text-foreground font-medium">"Generate"</span> for AI diagnostic summary.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Details + Tags (Left) & Comments (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Bottom-Left Column: Details Block + Tags Block */}
          <div className="space-y-4">
            {/* Details Card */}
            <div className="glass-panel border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="space-y-4">
                <DetailRow
                  label="Status"
                  value={
                    <Badge variant="outline" className={`${getStatusBadgeStyle(ticket.status)} capitalize`}>
                      {ticket.status?.replace("_", " ")}
                    </Badge>
                  }
                />
                <DetailRow
                  label="Priority"
                  value={
                    <Badge variant="outline" className={`badge-${ticket.priority?.toLowerCase()} capitalize`}>
                      {ticket.priority}
                    </Badge>
                  }
                />
                <DetailRow
                  icon={<User className="w-4 h-4" />}
                  label="Assigned To"
                  value={
                    <div className="flex items-center gap-2 justify-end">
                      {renderUserLink(ticket.assignedModerator, "Unassigned")}
                      {canAssignModal && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsModalOpen(true)}
                          className="h-7 px-2 border-dashed border-primary/50 hover:border-primary text-primary text-xs"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          {ticket.assignedModerator ? "Reassign" : "Assign"}
                        </Button>
                      )}
                    </div>
                  }
                />
                <DetailRow
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Assigned By"
                  value={renderUserLink(ticket.assignedByLabAssistant, "—")}
                />
                <DetailRow
                  icon={<Clock className="w-4 h-4" />}
                  label="Created"
                  value={new Date(ticket.createdAt).toLocaleDateString()}
                />
              </div>
            </div>

            {/* Tags Card */}
            <div className="glass-panel border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tags</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {ticket.tags?.length ? (
                  ticket.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No tags attached</span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom-Right Column: Comments Component */}
          <TicketComments ticket={ticket} renderUserLink={renderUserLink} />

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
    <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-2.5 last:border-none last:pb-0">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-right font-medium text-sm">{value}</div>
    </div>
  );
}