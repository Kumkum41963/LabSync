// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/login`,
//         form
//       );

//       const { token, user } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error);
//       const message =
//         error.response?.data?.message || "Login failed. Please try again.";
//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//       <div className="card w-full max-w-sm shadow-2xl bg-[#1a1a2e] border border-cyan-500 text-white">
//         <form onSubmit={handleLogin} className="card-body">
//           <h2 className="card-title justify-center text-3xl font-bold text-cyan-400 mb-2">
//             Login
//           </h2>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="input input-bordered bg-[#0f172a] border border-cyan-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="input input-bordered bg-[#0f172a] border border-cyan-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <div className="mt-6 flex justify-center">
//             <button
//               type="submit"
//               className="btn bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold hover:from-sky-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-400/40"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>

//           <p className="mt-4 text-center text-sm text-gray-400">
//             Don&apos;t have an account?{" "}
//             <Link to="/signup" className="text-cyan-300 hover:underline font-medium">
//               Sign up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React from "react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthSidebar
        title="Welcome Back to Labsync"
        subtitle="Login to continue managing your lab efficiently."
      />
      <AuthForm type="login" />
    </div>
  );
};

export default Login;

