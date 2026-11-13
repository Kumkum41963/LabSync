import express from "express";
import { 
    addComment,
  getCommentsByTicket, 
  updateComment, 
  deleteComment 
} from "../controllers/comment.controller.js";
import authenticate from "../middleware/auth.middleware.js"; 
import authorizedRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Routes mapped for tickets and comments
router.post("/tickets/:ticketId/comments", authenticate, authorizedRoles(["admin", "lab_assistant", "moderator"]), addComment);
router.get("/tickets/:ticketId/comments", authenticate, getCommentsByTicket);
router.put("/comments/:commentId", authenticate, authorizedRoles(["admin", "lab_assistant", "moderator"]), updateComment);
router.delete("/comments/:commentId", authenticate, authorizedRoles(["admin", "lab_assistant", "moderator"]), deleteComment);

export default router;