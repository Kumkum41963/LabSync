import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Settings, Ticket, Shield, LogOut, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { currentUser, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Tickets", path: "/tickets", icon: Ticket },
    { label: "Notices", path: "/notices", icon: Bell },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  if (currentUser?.role === "admin") {
    menuItems.push({ label: "Admin", path: "/admin", icon: Shield });
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "h-screen bg-background border-r border-border flex flex-col transition-all duration-300 z-50 sticky top-0",
          collapsed ? "w-[80px]" : "w-[260px]"
        )}
      >
        {/* Header */}
        <div className="h-[70px] flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent ml-2">
              LabSync
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("hover:bg-primary/10", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 mt-2">
          {menuItems.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Tooltip key={label} substitute={!collapsed}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-4 h-11 px-3 transition-all",
                      isActive ? "bg-primary/15 text-primary hover:bg-primary/20" : "text-muted-foreground",
                      collapsed && "justify-center px-0"
                    )}
                    onClick={() => navigate(path)}
                  >
                    <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                    {!collapsed && <span className="font-medium">{label}</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
              </Tooltip>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-border bg-muted/20">
          {!collapsed && currentUser && (
            <div className="mb-4 px-2">
              <p className="text-sm font-semibold truncate text-foreground">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.role.replace('_', ' ')}</p>
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className={cn("w-full border-primary/20 text-primary hover:bg-primary/10", collapsed && "px-0")}
          >
            <LogOut className={cn("w-4 h-4", !collapsed && "mr-2")} />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;