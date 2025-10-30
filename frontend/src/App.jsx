// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, RoleRoute } from "./utils/AppRoutes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import Dashboard from "./pages/Dashboard"; // create a simple Dashboard.jsx (below)

export default function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider must be inside BrowserRouter if it uses useNavigate */}
      <AuthProvider>
        <Routes>
          {/* public */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* protected: only logged-in users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* tickets route example: allow only admin/moderator to create maybe - but for listing we can allow all */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tickets" element={<Tickets />} />
            {/* if you want role-limited nested routes, use RoleRoute like:
                <Route element={<RoleRoute allowedRoles={['admin','moderator']} />}>
                  <Route path="/tickets/manage" element={<TicketsManage />} />
                </Route>
            */}
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
