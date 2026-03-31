import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
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

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email & Password are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Kindly login." });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("user creating!!!");

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
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

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("signup successful!!!");

    // Send success response
    //  NOTE: user and token these keywords must be consistent across the backend and frontend
    return res.status(201).json({
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

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Match the role
    if (user.role !== req.body.role) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log('login successfull!!!')

    // Return response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills
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
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1];

    console.log('token in logout:', token)

    if (!token) {
      return res.status(401).json({ error: "Unauthorized, token not found." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET,
      (err) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized, invalid token." });
        }
        // return success res.
        return res.status(200).json({ message: "Logout successful" });
      });

  } catch (error) {
    res.status(500).json({ error: "login failed", details: error.message });
  }
};

// Update Skills 
// Moderators Faculty Admin - roles allowed 
// Only owner allowed to do so 
// Get the user id 
// Match with the incoming id in params from req
// Matches - update else no
// Get the user from db 
// update the skills as we received from the req
export const updateSkills = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('body:', req.body);
    const { skills } = req.body;

    if (req.user.role !== "admin" && req.user.id !== targetId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findByIdAndUpdate(id, { skills }, { new: true }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "Skills updated", user }); 
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

// Update Role
// Faculty Admin - roles allowed 
// Get the user from db 
// update the role as we received from the req
export const updateRoles = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id from params:', id)
    const { role } = req.body;

    // if not admin or lab then not allowed
    if (req.user.role !== "admin"  && req.user.role !== "lab_assistant") {
      return res.status(403).json({ error: "Only admins or lab assistants can change roles" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log('User after role updation:', user);

    return res.status(200).json({ message: "Role updated", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get the profile of the logged in user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: "Unauthorized", 
        message: "User ID missing from request." 
      });
    }

    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "Not Found", 
        message: "User profile does not exist in our records." 
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log('Error in fetchinf current user:', error.message)
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user?.id;

    const users = await User.find({ _id: { $ne: userId } }) 
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      users 
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Data retrieval failed",
      message: error.message
    });
  }
};

// Get user by Id
export const getUserById = async (req, res) => {
  try {
    const { targetId } = req.params;
    const user = await User.findById(targetId).select("-password -__v");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log('Error in fetching user by id:', error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};
