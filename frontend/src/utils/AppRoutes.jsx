import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import CheckAuth from "@/utils/CheckAuth";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

// 📦 Main Feature Pages
import Tickets from "@/pages/Tickets/Tickets";
import TicketDetails from "@/pages/Tickets/TicketDetails";
import CreateTicket from "@/pages/Tickets/CreateTicket";
import UpdateTicket from "@/pages/Tickets/UpdateTicket";

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
          {/* 🏠 Dashboard */}
          <Route index element={<Dashboard />} />

          {/* 🎟️ Tickets (Main + Subroutes) */}
          <Route path="tickets">
            <Route index element={<Tickets />} /> {/* /tickets */}
            <Route path="create" element={<CreateTicket />} /> {/* /tickets/create */}
            <Route path=":id" element={<TicketDetails />} /> {/* /tickets/:id */}
            <Route path=":id/edit" element={<UpdateTicket />} /> {/* /tickets/:id/edit */}
          </Route>

          {/* 🧾 Applications */}
          <Route path="applications" element={<Applications />} />

          {/* 📢 Notices */}
          <Route path="notices" element={<Notices />} />

          {/* 📦 Inventory */}
          <Route path="inventory" element={<Inventory />} />
        </Route>

        {/* ❌ Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

