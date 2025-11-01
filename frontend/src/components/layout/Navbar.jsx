// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useAuth } from "@/hooks/useAuth";
// import { Moon, Sun } from "lucide-react";

// const Navbar = () => {
//   const { currentUser, handleLogout } = useAuth();

//   const navigate = useNavigate();

//   const [isDarkMode, setIsDarkMode] = useState(true);

//   // Toggle dark/light mode
//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     if (isDarkMode) {
//       document.documentElement.classList.remove("dark");
//     } else {
//       document.documentElement.classList.add("dark");
//     }
//   };

//   return (
//     <header className="w-full bg-[#0f172a] dark:bg-[#0b1120] border-b border-cyan-500/30 text-white fixed top-0 left-0 z-40">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Brand Logo */}
//         <h1
//           onClick={() => navigate("/")}
//           className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
//         >
//           LabSync
//         </h1>

//         {/* Theme Toggle + Auth Buttons */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full border border-cyan-500/40 hover:bg-cyan-500/10 transition"
//             aria-label="Toggle theme"
//           >
//             {isDarkMode ? (
//               <Sun className="w-5 h-5 text-cyan-400" />
//             ) : (
//               <Moon className="w-5 h-5 text-cyan-400" />
//             )}
//           </button>

//           {/* Auth Buttons */}
//           {currentUser ? (
//             <Button
//               onClick={handleLogout}
//               variant="outline"
//               className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
//             >
//               Logout
//             </Button>
//           ) : (
//             <>
//               <Button
//                 onClick={() => navigate("/login")}
//                 variant="outline"
//                 className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
//               >
//                 Login
//               </Button>
//               <Button
//                 onClick={() => navigate("/signup")}
//                 className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-white"
//               >
//                 Sign Up
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { currentUser, handleLogout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <header className="w-full bg-[#0f172a] dark:bg-[#0b1120] border-b border-cyan-500/30 text-white fixed top-0 right-0 z-40 flex justify-end items-center px-6 py-4 h-19.5">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-cyan-500/40 hover:bg-cyan-500/10 transition"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-cyan-400" />
          ) : (
            <Moon className="w-5 h-5 text-cyan-400" />
          )}
        </button>

        {currentUser ? (
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-white">
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

