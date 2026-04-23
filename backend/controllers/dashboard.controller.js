import {
  getAdminDashboardStats,
  getLabAssistantDashboardStats,
  getModeratorDashboardStats,
  getStudentDashboardStats
} from "../utils/dashboardStats.js";

export const getDashboard = async (req, res) => {
  try {
    const user = req.user;
    const role = user.role;

    console.log('user data:', user);
    console.log('role:', role);

    let data;

    if (role === "admin") {
      data = await getAdminDashboardStats(user);
    } else if (role === "lab_assistant") {
      data = await getLabAssistantDashboardStats(user);
    } else if (role === "moderator") {
      data = await getModeratorDashboardStats(user);
    } else {
      data = await getStudentDashboardStats(user);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ message: "Failed to load dashboard" });
  }
};