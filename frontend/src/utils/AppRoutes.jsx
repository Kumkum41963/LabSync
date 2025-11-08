import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import CheckAuth from "@/utils/CheckAuth";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
import Tickets from "@/pages/Tickets/Tickets";
import Notices from "@/pages/Notices";
import Applications from "@/pages/Applications";
import Inventory from "@/pages/Inventory";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🔒 Protected Routes (Requires Authentication) */}
        <Route
          path="/"
          element={
            <CheckAuth
              allowedRoles={["admin", "moderator", "student", "lab_assistant"]}
            >
              <Layout />
            </CheckAuth>
          }
        >
          {/* 🏠 Default dashboard route */}
          <Route index element={<Dashboard />} />

          {/* 🎟️ Tickets */}
          <Route path="tickets" element={<Tickets />} />

          {/* 🧾 Applications */}
          <Route path="applications" element={<Applications />} />

          {/* 📢 Notices */}
          <Route path="notices" element={<Notices />} />

          {/* 📦 Inventory */}
          <Route path="inventory" element={<Inventory />} />
        </Route>

        {/* ❌ Fallback routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
