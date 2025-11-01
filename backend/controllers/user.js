import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { inngest } from "../inngest/client.js";

/*
Signup a new user
- Take the credentials
- Check if email exists
- Hash the password
- Create the user
- Return the JWT token
*/
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, skills = [], role } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email & Password are required" });
    }

    // 2️⃣ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Kindly login." });
    }

    // 3️⃣ Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("user creating!!!");

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      skills: [],
    });

    console.log("user creating ended!!!");

    // fire inngest event
    try {
      const inngestRes = await inngest.send({
        name: "user/signup",
        data: {
          email,
        },
      });
      console.log("inngest res from signup", inngestRes);
    } catch (error) {
      console.log("inngestRes error from signup controller", error);
    }

    // 5️⃣ Create JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("signup successful!!!");

    // 6️⃣ Send success response
    //  NOTE: user and token these keywords must be consistent across the backend and frontend
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error during signup" });
  }
};

/*
Login a new user
- Take the credentials
- Check if email exists
- compare the password
- Create the JWT token
- Return the JWT token
*/
export const login = async (req, res) => {
  try {
    console.log('req body', req.body)
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are required" });

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 3️⃣ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Return response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split("")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Unauthorized" });
      res.json({ message: "Logout successful" });
    });
  } catch (error) {
    res.status(500).json({ error: "login failed", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { skills = [], role, email } = req.body;

  try {
    if (req.user?.role !== "admin") {
      return res.status(401).json({ error: "Forbidden" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "User not found" });

    await User.updateOne(
      { email },
      { skills: skills.length ? skills : user.skills, role }
    );

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "update failed",
      details: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch (error) {
    res.status(500).json({
      error: "update failed",
      details: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allowedRoles = ["admin", "moderator"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const users = await User.find().select("-password");
    return res.json({ users });
  } catch (error) {
    res.status(500).json({
      error: "update failed",
      details: error.message,
    });
  }
};
