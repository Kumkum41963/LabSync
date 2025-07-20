// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CheckAuth from "./components/CheckAuth.jsx";
// import Tickets from "./pages/Tickets.jsx";
// import TicketDetails from "./pages/TicketDetails.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Admin from "./pages/Admin.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <CheckAuth protected={true}>
//               <Tickets />
//             </CheckAuth>
//           }
//         />
//         <Route
//           path="/tickets/:id"
//           element={
//             <CheckAuth protected={true}>
//               <TicketDetails />
//             </CheckAuth>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <CheckAuth protected={false}>
//               <Login />
//             </CheckAuth>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <CheckAuth protected={false}>
//               <Signup />
//             </CheckAuth>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <CheckAuth protected={true}>
//               <Admin />
//             </CheckAuth>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./components/CheckAuth.jsx";
import Tickets from "./pages/Tickets.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Admin from "./pages/Admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a] text-white">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth protected={true}>
                <Tickets />
              </CheckAuth>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <CheckAuth protected={true}>
                <TicketDetails />
              </CheckAuth>
            }
          />
          <Route
            path="/login"
            element={
              <CheckAuth protected={false}>
                <Login />
              </CheckAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <CheckAuth protected={false}>
                <Signup />
              </CheckAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <CheckAuth protected={true}>
                <Admin />
              </CheckAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>
);
