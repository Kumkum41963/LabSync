import Comment from "../models/comment.model.js";
import Ticket from "../models/ticket.model.js";
// import User from "../models/user.model.js";

// Get all comments for a specific ticket
export const getCommentsByTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    console.log(`[DEBUG] Fetching comments for ticket ID: ${ticketId}`);

    const comments = await Comment.find({ ticket: ticketId })
      .populate("author", "name email role")
      .sort({ createdAt: 1 }); // Oldest to newest chronological order

    console.log(`[DEBUG] Found ${comments.length} comments for ticket: ${ticketId}`, comments);
    
    return res.status(200).json({
      success: true,
      count: comments.length,
      comments, // Note: Kept property name as comments (plural) to align cleanly with frontend mappings
    });
  } catch (error) {
    console.error("[DEBUG ERROR] Fetch comment error:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching comments", error: error.message });
  }
};

// CREATE a new comment for a ticket
export const addComment = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { text } = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    console.log(`[DEBUG] Attempting to add comment to ticket: ${ticketId} by user: ${userId} (${userRole})`);

    if (!text || text.trim() === "") {
      console.log("[DEBUG] Validation failed: Comment text is empty");
      return res.status(400).json({ success: false, message: "Comment text cannot be empty" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      console.log(`[DEBUG] Ticket not found with ID: ${ticketId}`);
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    // Create the comment document
    const newComment = await Comment.create({
      ticket: ticketId,
      author: userId,
      text: text.trim(),
    });
    console.log("[DEBUG] Comment document created successfully:", newComment._id);

    // Push comment reference to ticket's comments array
    if (!ticket.comments) ticket.comments = [];
    ticket.comments.push(newComment._id);
    await ticket.save();
    console.log(`[DEBUG] Comment reference pushed to ticket ${ticketId}. Total comments: ${ticket.comments.length}`);

    // Populate author details for immediate UI rendering
    const populatedComment = await Comment.findById(newComment._id).populate("author", "name email role");

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("[DEBUG ERROR] Add comment error:", error);
    return res.status(500).json({ success: false, message: "Server error while adding comment", error: error.message });
  }
};

// UPDATE an existing comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    console.log(`[DEBUG] Attempting to update comment: ${commentId} by user: ${userId} (${userRole})`);

    if (!text || text.trim() === "") {
      console.log("[DEBUG] Validation failed: Update text is empty");
      return res.status(400).json({ success: false, message: "Comment text cannot be empty" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.log(`[DEBUG] Comment not found with ID: ${commentId}`);
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Authorization: Only Admin, Lab Assistant, or the original Author can edit
    const isAuthor = comment.author.toString() === userId?.toString();
    console.log(`[DEBUG] Authorization check - Is Author: ${isAuthor}, User Role: ${userRole}`);

    if (!isAuthor && userRole !== "admin" && userRole !== "lab_assistant") {
      console.log("[DEBUG] Authorization failed: User not permitted to edit this comment");
      return res.status(403).json({ success: false, message: "You are not authorized to edit this comment" });
    }

    comment.text = text.trim();
    await comment.save();
    console.log(`[DEBUG] Comment ${commentId} updated successfully`);

    const updatedComment = await Comment.findById(commentId).populate("author", "name email role");

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("[DEBUG ERROR] Update comment error:", error);
    return res.status(500).json({ success: false, message: "Server error while updating comment", error: error.message });
  }
};

// DELETE a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    console.log(`[DEBUG] Attempting to delete comment: ${commentId} by user: ${userId} (${userRole})`);

    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.log(`[DEBUG] Comment not found with ID: ${commentId}`);
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Authorization: Only Admin, Lab Assistant, or the original Author can delete
    const isAuthor = comment.author.toString() === userId?.toString();
    console.log(`[DEBUG] Authorization check - Is Author: ${isAuthor}, User Role: ${userRole}`);

    if (!isAuthor && userRole !== "admin" && userRole !== "lab_assistant") {
      console.log("[DEBUG] Authorization failed: User not permitted to delete this comment");
      return res.status(403).json({ success: false, message: "You are not authorized to delete this comment" });
    }

    // Remove reference from parent Ticket as well
    await Ticket.findByIdAndUpdate(comment.ticket, {
      $pull: { comments: commentId }
    });
    console.log(`[DEBUG] Comment reference removed from parent ticket: ${comment.ticket}`);

    await comment.deleteOne();
    console.log(`[DEBUG] Comment document deleted successfully: ${commentId}`);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      commentId,
    });
  } catch (error) {
    console.error("[DEBUG ERROR] Delete comment error:", error);
    return res.status(500).json({ success: false, message: "Server error while deleting comment", error: error.message });
  }
};