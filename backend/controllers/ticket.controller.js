import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.model.js";
import User from "../models/user.model.js";

// 🆕 createTicket: Student or Admin raises a new ticket
export const createTicket = async (req, res) => {
  try {
    const user = req.user;

    // Defensive role check
    if (user.role !== "student" && user.role !== "admin") {
      console.warn(`Unauthorized createTicket attempt by ${user.role}`);
      return res
        .status(403)
        .json({ message: "Only students can raise tickets" });
    }

    let { title, description, tags } = req.body;

    console.log("Received createTicket request with:", {
      title,
      description,
      tags,
    });

    // Normalize tags to always be an array: incase frontend req. with a string
    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean);
    }

    // Validate inputs
    if (!title || !description || !tags || tags.length === 0) {
      console.warn("⚠️ Missing required ticket fields");
      return res.status(400).json({
        message: "Title, description, and at least one tag are required",
      });
    }

    if (!title || !description) {
      console.warn("⚠️ Missing required ticket fields");
      return res.status(400).json({
        message: "Title, descriptionare required",
      });
    }

    // Create ticket in DB
    const newTicket = await Ticket.create({
      title,
      description,
      tags,
      createdBy: req.user._id.toString(),
    });

    console.log("✅ Ticket created in DB:", newTicket);

    // Send event to Inngest for background AI processing
    try {
      await inngest.send({
        name: "ticket/created",
        data: {
          ticketId: newTicket._id.toString(),
          title,
          description,
          tags,
          createdBy: req.user._id.toString(),
        },
      });
      console.log("🚀 Inngest event sent for ticket creation");
    } catch (error) {
      console.error("⚠️ Inngest event failed:", error.message);
    }

    return res.status(201).json({
      message:
        "Ticket created successfully; AI summary will be generated shortly.",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("❌ Error creating ticket:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📋 getTickets: Role-aware unified fetch for Admin, Lab Assistant, Moderator, and Student
export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    console.log(`Fetching tickets for ${user.name} with (${user.role})`);

    // Destructure params query
    let {
      search,
      tag,
      status,
      priority,
      assigned,
      sort = "createdAt-desc",
      page = 1,
      limit = 6,
    } = req.query;

    // Convert page and limit to integers for pagination calculations
    page = Number.parseInt(page) || 1;
    limit = Math.min(Number.parseInt(limit) || 6, 100);

    const filter = {}; // conditions at which fetching/searching is to be done

    // Role-based scoping
    switch (user.role) {
      case "admin":
      case "lab_assistant":
        // See all tickets — no restriction
        break;

      case "moderator":
        // Moderators can only view tickets assigned to them
        filter.assignedModerator = user._id;
        break;

      case "student":
        // Students can only view tickets they created
        filter.createdBy = user._id;
        break;

      default:
        return res.status(403).json({ message: "Access denied" });
    }

    // Set params filters that are sent by frontend
    if (tag) filter.tags = { $in: [tag] };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assigned === "true") {
      filter.assignedModerator = { $ne: null };
    } else if (assigned === "false") {
      filter.assignedModerator = null;
    }
    // Text search (title + description)
    if (search) filter.$text = { $search: search };

    console.log("🔍 Final Filter Object →", filter);

    // Apply sorting options
    const sortOptions = {};
    const [sortField, sortDirection] = sort.split("-");
    sortOptions[sortField] = sortDirection === "asc" ? 1 : -1;

    console.log("⚙️ Sort Options →", sortOptions);

    // Pagination (skip + limit)
    // Number of data to skip
    const skip = (page - 1) * limit;

    // Fetch total count before pagination
    const totalCount = await Ticket.countDocuments(filter);

    console.log(`📊 Total tickets matching filter are: ${totalCount}`);

    // Fetch paginated result & populate based on filter
    const tickets = await Ticket.find(filter)
      .populate("createdBy", ["name", "email", "_id", "role"])
      .populate("assignedModerator", ["name", "email", "_id"])
      .populate("assignedByLabAssistant", ["name", "email", "_id"])
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Validate ticket found
    if (!tickets || tickets.length === 0) {
      return res.status(204).json({
        message: "No tickets found",
        tickets: [],
      });
    }

    console.log(
      `✅ ${tickets.length} tickets fetched for ${user.name} with role ${user.role}`
    );

    console.log("All fetched tickets:", tickets);

    return res.status(200).json({
      message: "Tickets fetched successfully 🟢",
      count: tickets.length,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets ❌:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔍 getTicketById: View full ticket details
export const getTicketById = async (req, res) => {
  try {
    const user = req.user;
    const ticketId = req.params.id;
    console.log(
      `Fetching ticket with ID: ${ticketId} createdby ${user.name} and asssigned to`
    );

    // Find the ticket and populate related fields
    const ticket = await Ticket.findById(ticketId)
      .populate("createdBy", ["name", "email", "_id", "role"])
      .populate("assignedModerator", ["name", "email", "_id"])
      .populate("assignedByLabAssistant", ["name", "email", "_id"]);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found ❌" });
    }

    // Role-based access control
    const isCreator = ticket.createdBy._id.toString() === user._id.toString();
    const isAssignedModerator =
      ticket.assignedModerator?._id?.toString() === user._id.toString();

    // admin and lab_assistant can view any ticket
    // but student needs to be creator of it
    // and moderator has to be assigned to it to view
    if (
      (user.role === "student" && !isCreator) ||
      (user.role === "moderator" && !isAssignedModerator)
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this ticket 🚫" });
    }

    console.log("Ticket fetched successfully ✅:", ticket._id);

    return res.status(200).json({
      message: "Ticket details fetched successfully 🟢",
      ticket,
    });
  } catch (error) {
    console.error("Error fetching ticket by ID ❌:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔄 updateTicketById: Role-based update (Student, Moderator, Lab Assistant, Admin)
export const updateTicketById = async (req, res) => {
  try {
    const user = req.user;
    const ticketId = req.params.id;
    const updates = req.body;

    console.log(`🛠 Updating ticket ${ticketId} by ${user.role}`);

    // Define editable fields per role
    const rolePermissions = {
      student: ["title", "description", "tags"],
      moderator: ["status", "relatedSkills"],
      lab_assistant: ["priority", "status", "assignedModerator"],
      admin: [
        "title",
        "description",
        "tags",
        "priority",
        "status",
        "assignedModerator",
        "assignedByLabAssistant",
        "aiSummary",
        "relatedSkills",
      ],
    };

    // Fetch and validate the ticket exist
    const ticket = await Ticket.findById(ticketId);
    if (!ticket)
      return res.status(404).json({ message: "Ticket not found ❌" });

    // Validate if the role exists in the map or not
    const allowedFields = rolePermissions[user.role] || [];
    if (allowedFields.length === 0) {
      return res.status(403).json({ message: "Role not authorized ❌" });
    }

    // Track what fields are modified
    const changedFields = [];

    // Apply allowed updates
    for (const key of allowedFields) {
      // check key updated not undefined and not same as prev.
      if (updates[key] !== undefined && updates[key] !== ticket[key]) {
        ticket[key] = updates[key]; // update that field in ticket
        changedFields.push(key); // push in for auditLog
      }
    }

    // If Lab Assistant or Admin assigns a moderator
    if (
      (user.role === "lab_assistant" || user.role === "admin") &&
      updates.assignedModerator
    ) {
      ticket.assignedByLabAssistant = user._id;
    }

    // Log who made changes after above we logged where changes were made
    if (changedFields.length > 0) {
      // something was updated indeed
      ticket.auditLog.push({
        actionBy: user._id,
        role: user.role,
        fieldsChanged: changedFields,
        updatedAt: new Date(),
      });
    }

    // Finally save the ticket in DB after updation
    const updatedTicket = await ticket.save();

    // Trigger AI update only if Student changes key fields
    const aiRelevant = ["title", "description", "tags"];
    const studentEdited =
      user.role === "student" &&
      changedFields.some(f => aiRelevant.includes(f));

    if (studentEdited) {
      try {
        await inngest.send({
          name: "ticket/updated",
          data: { ticketId: ticket._id.toString() },
        });
        console.log("🧠 AI reprocessing triggered");
      } catch (e) {
        console.warn("⚠️ Inngest update event failed:", e.message);
      }
    }

    return res.status(200).json({
      message: "Ticket updated successfully 🟢",
      changedFields,
      updatedTicket,
    });
  } catch (error) {
    console.error("❌ Error updating ticket:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🗑️ deleteTicket: Admin deletes a ticket if necessary and student deletes their own ticket
export const deleteTicketById = async (req, res) => {
  try {
    const user = req.user;
    const ticketId = req.params.id;

    console.log(
      `Delete request by ${user.name} (${user.role}) for ticket ${ticketId}`
    );

    // Only Admin or ticket creator can delete
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found ❌" });
    }

    const isCreator = ticket.createdBy.toString() === user._id.toString();

    // if not admin or creator i.e mod/lab_assistant
    if (user.role !== "admin" && !isCreator) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this ticket 🚫" });
    }

    // Delete the ticket
    await Ticket.findByIdAndDelete(ticketId);
    console.log(`✅ Ticket ${ticketId} deleted by ${user.name}`);

    return res.status(200).json({ message: "Ticket deleted successfully 🟢" });
  } catch (error) {
    console.error("Error deleting ticket by ID ❌:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🧑‍🏫 assignModerator: Lab Assistant assigns a moderator to a ticket
export const assignModerator = async (req, res) => {
  try {
    const { id } = req.params; // ticket id
    const { moderatorId } = req.body;
    const user = req.user; // who’s assigning

    console.log(
      `🧰 ${user.role} assigning moderator ${moderatorId} to ticket ${id}`
    );

    // Only lab assistant or admin can assign
    const allowedRoles = ["lab_assistant", "admin"];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Not authorized ❌" });
    }

    // Check if moderator exists and has correct role
    const moderator = await User.findById(moderatorId);
    if (!moderator || moderator.role !== "moderator") {
      return res.status(400).json({ message: "Invalid moderator ID ❌" });
    }

    // Find the ticket
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found ❌" });
    }

    // Assign the moderator
    ticket.assignedModerator = moderatorId;
    ticket.assignedByLabAssistant = user._id;
    ticket.status = "in_progress";
    ticket.auditLog.push({
      actionBy: user._id,
      role: user.role,
      fieldsChanged: ["assignedModerator"],
      updatedAt: new Date(),
    });

    const updatedTicket = await ticket.save();

    return res.status(200).json({
      message: "Moderator assigned successfully 🟢",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("❌ Error assigning moderator:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📊 getDashboardStats: Show ticket counts by status, priority, or tag

// ✅ closeTicket: Student confirms issue resolved (marks ticket closed)
