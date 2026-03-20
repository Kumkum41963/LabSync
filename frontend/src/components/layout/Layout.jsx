import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip"; // Import this

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    /* Wrap everything in the Provider */
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar uses the tooltips internally */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar />

          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Layout;