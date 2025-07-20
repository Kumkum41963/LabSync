import { inngest } from '../inngest/client.js';
import Ticket from '../models/ticket.js';

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("Received createTicket request with:", { title, description });

    if (!title || !description) {
      console.warn("Missing title or description");
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString(),
    });

    console.log("Ticket created in DB:", newTicket);

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title,
        description,
        createdBy: req.user._id.toString(),
      },
    });

    console.log("Inngest event sent for ticket creation");

    return res.status(201).json({
      message: "Ticket created and processing started",
      ticket: newTicket,
    });

  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    console.log("Fetching tickets for user:", user._id, "with role:", user.role);

    let tickets = [];

    if (user.role !== "user") {
      tickets = await Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
      console.log("Admin/mentor fetched all tickets");
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
      console.log("User fetched own tickets");
    }

    return res.status(200).json({tickets});
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    const ticketId = req.params.id;
    // console.log("Fetching ticket with ID:", ticketId, "for user:", user._id);

    let ticket;

    if (user.role !== "user") {
      ticket = await Ticket.findById(ticketId).populate("assignedTo", ["email", "_id"]);
    //   console.log("Admin/mentor fetching any ticket");
    } else {
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: ticketId,
      }).select("title description status createdAt");
      console.log("User fetching own ticket");
    }

    if (!ticket) {
      console.warn("Ticket not found:", ticketId);
      return res.status(404).json({ message: "Ticket not found" });
    }

    console.log("Ticket found:", ticket._id);
    return res.status(200).json({ ticket });
  } catch (error) {
    console.error("Error fetching ticket:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// export const createTicket = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     console.log("[createTicket] Received:", { title, description });

//     if (!title || !description) {
//       return res.status(400).json({ message: "Title and description are required" });
//     }

//     const ticket = await Ticket.create({
//       title,
//       description,
//       createdBy: req.user._id,
//       status: 'open'
//     });
//     console.log("[createTicket] Created ticket:", ticket._id.toString());

//     await inngest.send({
//       name: "ticket/created",
//       data: {
//         ticketId: ticket._id.toString(),
//         createdBy: req.user._id.toString(),
//         title,
//         description
//       }
//     });
//     console.log("[createTicket] Inngest event sent");

//     return res.status(201).json({
//       message: "Ticket created and AI processing started",
//       processing: true,
//       ticket
//     });
//   } catch (err) {
//     console.error("[createTicket] Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getTickets = async (req, res) => {
//   try {
//     const user = req.user;
//     console.log("[getTickets] Fetching for user:", user._id, "role:", user.role);

//     const query = user.role === 'user' ? { createdBy: user._id } : {};
//     const tickets = await Ticket.find(query)
//       .populate('assignedTo', ['email', '_id'])
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ tickets });
//   } catch (err) {
//     console.error("[getTickets] Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getTicket = async (req, res) => {
//   try {
//     const user = req.user;
//     const { id } = req.params;
//     console.log("[getTicket] id:", id, "user:", user._id, "role:", user.role);

//     const ticket = await Ticket.findById(id)
//       .populate('assignedTo', ['email', '_id']);

//     if (!ticket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }
//     if (user.role === 'user' && ticket.createdBy.toString() !== user._id.toString()) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     return res.status(200).json({ ticket });
//   } catch (err) {
//     console.error("[getTicket] Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };










