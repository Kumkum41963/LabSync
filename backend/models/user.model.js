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
      trim: true,
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
      index: true, // used for filtering users by role
    },

    skills: {
      type: [String],
      default: [],
      index: true, // used for moderator recommendation
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, skills: 1 })// Often used: find moderator with specific skills
userSchema.index({ name: "text", email: "text" }); //searching users by name/email (admin search)

const User = mongoose.model("User", userSchema);
export default User;
