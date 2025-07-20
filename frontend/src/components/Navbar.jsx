// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const token = localStorage.getItem("token");
//   let user = localStorage.getItem("user");
//   if (user) {
//     user = JSON.parse(user);
//   }
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };
//   return (
//     <div className="navbar bg-base-200">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl">
//           Ticket AI
//         </Link>
//       </div>
//       <div className="flex gap-2">
//         {!token ? (
//           <>
//             <Link to="/signup" className="btn btn-sm">
//               Signup
//             </Link>
//             <Link to="/login" className="btn btn-sm">
//               Login
//             </Link>
//           </>
//         ) : (
//           <>
//             <p>Hi, {user?.email}</p>
//             {user && user?.role === "admin" ? (
//               <Link to="/admin" className="btn btn-sm">
//                 Admin
//               </Link>
//             ) : null}
//             <button onClick={logout} className="btn btn-sm">
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { Moon, LogOut, User, ShieldCheck, UserPlus, LogIn } from "lucide-react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-[#0f0f11] text-white shadow-lg shadow-blue-500/10 border-b border-gray-700 px-4">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-blue-400">
          LabSync
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {!token ? (
          <>
            <Link to="/signup" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-500">
              <UserPlus className="w-4 h-4" /> Signup
            </Link>
            <Link to="/login" className="btn btn-sm bg-blue-700 text-white hover:bg-blue-600">
              <LogIn className="w-4 h-4" /> Login
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-blue-300">
              <User className="inline w-4 h-4 mr-1" /> {user?.email}
            </p>
            {user?.role === "admin" && (
              <Link to="/admin" className="btn btn-sm bg-fuchsia-700 text-white hover:bg-fuchsia-600">
                <ShieldCheck className="w-4 h-4" /> Admin
              </Link>
            )}
            <button onClick={logout} className="btn btn-sm bg-red-600 text-white hover:bg-red-500">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

