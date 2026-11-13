import { useState } from "react";
import { MessageSquare, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTickets } from "@/context/TicketsContext";
import { useRole } from "@/context/RoleContext";

export default function TicketComments({ ticket, renderUserLink }) {
  const { addComment, updateComment, deleteComment } = useTickets();
  const { role, currentUser, isAdmin, isLabAssistant } = useRole();

  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isStudent = role === "student";
  const isModerator = role === "moderator";
  const isClosed = ticket.status === "closed";

  // Check if current moderator is assigned to this ticket
  const assignedModId = ticket.assignedModerator?._id || ticket.assignedModerator;
  const isAssignedModerator = assignedModId?.toString() === currentUser?._id?.toString();

  // Role-based Access Rules:
  // - Admin & Lab Assistant: No restrictions, full access.
  // - Moderator: Can only view/interact if assigned to this ticket.
  // - Student: Can view comments, but CAN NEVER add comments.
  const isAuthorizedModerator = !isModerator || isAssignedModerator;
  const canAddComment = !isStudent && isAuthorizedModerator && (!isClosed || isAdmin || isLabAssistant);

  // Handle Add Comment
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !canAddComment) return;

    setSubmitting(true);
    try {
      const res = await addComment(ticket._id, newCommentText);
      if (res.success) {
        setNewCommentText("");
      } else {
        alert(res.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Update Comment
  const handleUpdateSubmit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await updateComment(commentId, ticket._id, editText);
      if (res.success) {
        setEditingCommentId(null);
        setEditText("");
      } else {
        alert(res.message || "Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Handle Delete Comment
  const handleDelete = async (commentId) => {
    try {
      const res = await deleteComment(commentId, ticket._id);
      if (!res.success) {
        alert(res.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // If a moderator is trying to view a ticket they are not assigned to
  if (isModerator && !isAssignedModerator) {
    return (
      <div className="glass-panel border border-border rounded-lg p-6 text-center text-muted-foreground text-sm h-[200px] flex items-center justify-center">
        You must be assigned to this ticket to view comments.
      </div>
    );
  }

  return (
    <div className="glass-panel border border-border rounded-lg p-6 flex flex-col h-[440px] justify-between">
      <div className="space-y-4 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Comments</h2>
          </div>
          {isClosed && (
            <Badge variant="outline" className="text-xs border-destructive/40 text-destructive">
              Closed
            </Badge>
          )}
        </div>

        {/* Comments List with Clean Scrolling (Box size won't stretch) */}
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {ticket.comments?.length ? (
            ticket.comments.map((comment) => {
              const authorObj = typeof comment.author === 'object' ? comment.author : null;
              const authorName = authorObj?.name || "Unknown User";
              const authorRole = authorObj?.role || "user";
              
              const authorId = authorObj?._id || comment.author;
              const isAuthor = authorId?.toString() === currentUser?._id?.toString();
              const canModify = !isStudent && (isAdmin || isLabAssistant || isAuthor) && (!isClosed || isAdmin || isLabAssistant);
              const isEditing = editingCommentId === comment._id;

              const commentDate = comment.createdAt || comment.updatedAt;
              const formattedDate = commentDate ? new Date(commentDate).toLocaleDateString() : "Just now";

              return (
                <div key={comment._id || Math.random()} className="bg-muted/30 p-3.5 rounded-lg border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {renderUserLink(authorObj, authorName)}
                      <span className="ml-1.5 text-[10px] font-normal uppercase text-muted-foreground/85">
                        ({authorRole})
                      </span>
                    </span>
                    <span>{formattedDate}</span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={2}
                        className="w-full bg-input/50 border border-border rounded p-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingCommentId(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleUpdateSubmit(comment._id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground whitespace-pre-line">{comment.text}</p>
                  )}

                  {/* Action buttons */}
                  {canModify && !isEditing && (
                    <div className="flex justify-end gap-2 pt-1 border-t border-border/30">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditText(comment.text);
                        }}
                        className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-xs text-destructive hover:underline flex items-center gap-1 ml-2 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-muted-foreground text-xs bg-muted/20 rounded-md border border-dashed border-border">
              No comments posted yet.
            </div>
          )}
        </div>

        {/* Add Comment Form (Completely hidden for students and unassigned moderators) */}
        {canAddComment && (
          <form onSubmit={handleAddSubmit} className="pt-3 border-t border-border/40 space-y-3 shrink-0">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              rows={2}
              placeholder="Write a new comment or lab update..."
              className="w-full bg-input/40 border border-border rounded-md p-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting || !newCommentText.trim()} size="sm">
                {submitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}