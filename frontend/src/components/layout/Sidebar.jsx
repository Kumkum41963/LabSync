import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  FileText,
  Settings,
  Ticket,
  Shield,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { currentUser, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Tickets", path: "/tickets", icon: Ticket },
    { label: "Notices", path: "/notices", icon: Bell },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  if (currentUser?.role === "admin") {
    menuItems.push({ label: "Admin", path: "/admin", icon: Shield });
  }

  return (
    <aside
      className={`h-screen bg-[#0b1120] border-r border-cyan-500/30 flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"} fixed md:relative z-50`}
    >
      {/* Logo & Collapse Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-cyan-500/30">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          {/* <img
            src="/logo192.png"
            alt="LabSync"
            className="w-8 h-8 object-contain"
          /> */}
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              LabSync
            </h1>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-cyan-500/10"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-cyan-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-cyan-400" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 flex flex-col mt-4 gap-2 px-3">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <div key={label} className="relative group">
            <button
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-cyan-500/10 transition
              ${location.pathname === path ? "bg-cyan-500/20 text-cyan-400" : ""}`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>

            {/* Tooltip on hover in collapsed mode */}
            {collapsed && (
              <span
                className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#1e293b] text-white text-sm px-2 py-1 rounded-md 
                opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap shadow-lg border border-cyan-500/30"
              >
                {label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="border-t border-cyan-500/30 p-4">
        {currentUser && !collapsed && (
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
          {!collapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;

