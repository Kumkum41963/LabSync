import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes extra spaces
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      // TODO: validator for email validation
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      // TODO: more securemnet
    },

    role: {
      type: String,
      enum: ["student", "lab_assistant", "moderator", "admin"],
      default: "student",
    },

    skills: {
      type: [String],
      default: [],
      index: true, // for skill-based search/filtering
    },
  },
  { timestamps: true }
);

// TODO: indexing 
// find user by email/role faster via indexing
// userSchema.index({ role: 1 });
// userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
