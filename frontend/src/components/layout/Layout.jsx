import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      {/* Sidebar (collapsible) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* <Navbar /> */}
        <main className="flex-1 overflow-y-auto bg-[#acbeea] dark:bg-[#4c68b2] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
