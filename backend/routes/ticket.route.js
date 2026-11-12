import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
  getSuggestedModerators,
  assignModerator,
  unassignModerator,
  updateTicketByModerator,
} from "../controllers/ticket.controller.js";
import { authenticate, authorizedRoles } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, authorizedRoles("student", "admin"), createTicket);
// router.post("/", createTicket);
router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicketById);
router.put("/:id", authenticate, updateTicketById);
router.delete("/:id", authenticate, authorizedRoles("student", "admin"), deleteTicketById);

// Moderator assignment and management routes
router.get("/:id/suggested-moderators", authenticate, getSuggestedModerators);
router.patch("/:id/assign-mod", authenticate, authorizedRoles("lab_assistant", "admin"), assignModerator);
router.patch("/:id/unassign-mod", authenticate, authorizedRoles("lab_assistant", "admin"), unassignModerator);
router.patch("/:id/moderator-update", authenticate, authorizedRoles("moderator", "admin", "lab_assistant"), updateTicketByModerator);

export default router;
