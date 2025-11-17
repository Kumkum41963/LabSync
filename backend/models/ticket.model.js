import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Ticket title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    tags: {
      type: [String],
      default: [],
      required: [true, "Tags is required"],
      index: true,
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
      index: true,
      // TODO: reopen with notifs
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedModerator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true, // filter for moderator dashboards
    },

    assignedByLabAssistant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
      default: null,
    },

    relatedSkills: {
      type: [String], // e.g., ['React', 'MongoDB', 'DP']
      default: [],
      index: true,
    },

    auditLog: [
      {
        actionBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who changed it
        role: { type: String },                                          // their role (snapshot)
        fieldsChanged: [String],                                         // what was changed
        updatedAt: { type: Date, default: Date.now },                    // when it happened
      },
    ],

    closedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto closing of status
ticketSchema.pre("save", function (next) {
  if (this.status === "closed" && !this.closedAt) {
    this.closedAt = new Date();
  }
  next();
});

// search bar: title + description
ticketSchema.index({ title: "text", description: "text" });

// common dashboard filters + sorting
ticketSchema.index({ createdAt: -1 });
ticketSchema.index({ status: 1, createdAt: -1 });
ticketSchema.index({ priority: 1, createdAt: -1 });

// // tag → skill recommendation matching
// ticketSchema.index({ tags: 1, relatedSkills: 1 });

// // moderator dashboard filtering
ticketSchema.index({ assignedModerator: 1, status: 1, priority: 1 });


const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
