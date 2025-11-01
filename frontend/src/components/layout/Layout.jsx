// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Sidebar from "@/components/layout/Sidebar";

// /**
//  * App layout that wraps all authenticated routes.
//  * Displays Navbar at the top, Sidebar on the left, and content (Outlet) in the center.
//  */
// const Layout = () => {
//   return (
//     <div className="flex flex-col h-screen bg-[#0f172a] text-white">
//       {/* Top Navbar */}
//       <Navbar />

//       <div className="flex flex-1 pt-20">
//         {/* Sidebar for navigation */}
//         <Sidebar />

//         {/* Main content area */}
//         <main className="flex-1 overflow-y-auto bg-[#0f172a] dark:bg-[#0b1120] p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      {/* Sidebar (collapsible) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0f172a] dark:bg-[#0b1120] pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
