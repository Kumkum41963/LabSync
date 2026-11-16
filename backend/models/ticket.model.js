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
      index: true,
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
      index: true,
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
      index: true,
    },

    assignedByLabAssistant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    aiStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    aiPriority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    aiGeneratedRequiredSkills: {
      type: [String],
      default: [],
    },

    moderatorSuggestions: {
      type: [
        {
          moderatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          matchScore: Number,
          explanation: String,
          suggestedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    auditLog: [
      {
        actionBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String },
        fieldsChanged: [String],
        updatedAt: { type: Date, default: Date.now },
      },
    ],

    closedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

ticketSchema.pre("save", function (next) {
  if (this.status === "closed" && !this.closedAt) {
    this.closedAt = new Date();
  }
  next();
});

ticketSchema.index({ title: "text", description: "text" });
ticketSchema.index({ createdAt: -1 });
ticketSchema.index({ status: 1, createdAt: -1 });
ticketSchema.index({ priority: 1, createdAt: -1 });
ticketSchema.index({ assignedModerator: 1, status: 1, priority: 1 });

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;