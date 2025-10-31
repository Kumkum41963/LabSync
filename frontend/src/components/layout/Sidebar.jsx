import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Bell,
  FileText,
  Settings,
  Ticket,
  Shield,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { currentUser, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar menu items
  const menuItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Notices", path: "/notices", icon: Bell },
    { label: "Applications", path: "/applications", icon: FileText },
    { label: "All Tickets", path: "/tickets", icon: Ticket },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  // Admin-only menu item
  if (user?.role === "admin") {
    menuItems.push({ label: "Admin Panel", path: "/admin", icon: Shield });
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#0b1120] border-r border-cyan-500/30 text-white pt-20">
      {/* 🧭 Navigation Links: dashboard, notices, applications, tickets, inventory, settings, admin */}
      <nav className="flex-1 flex flex-col p-4 gap-2">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-cyan-500/10 transition ${
              location.pathname === path ? "bg-cyan-500/20 text-cyan-400" : ""
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* 👤 User Info & Logout */}
      <div className="border-t border-cyan-500/30 p-4">
        {currentUser && (
          <div className="mb-3 text-sm text-gray-400">
            <p className="font-semibold text-cyan-400">Welcome, {currentUser.name}</p>
            <p className="text-xs">{currentUser.email}</p>
          </div>
        )}

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
