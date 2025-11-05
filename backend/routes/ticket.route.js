import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
  assignModerator,
} from "../controllers/ticket.controller.js";
import { authenticate, authorizedRoles } from "../middlewares/auth.js";

const router = express.Router();
// authorizedRoles(["student", "admin"]), 
router.post("/", authenticate, createTicket);
router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicketById);
router.put("/:id", authenticate, updateTicketById);
router.delete("/:id", authenticate, authorizedRoles(["student", "admin"]), deleteTicketById);
router.post("/:id/assign", authenticate, authorizedRoles(["lab_assistant", "admin"]), assignModerator);

export default router;
