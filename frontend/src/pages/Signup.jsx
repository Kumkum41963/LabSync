// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async e => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/signup`,
//         form
//       );

//       console.log("Signup response:", res.data);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       navigate("/");
//     } catch (error) {
//       console.log("Signup error:", error);

//       const message =
//         error.response?.data?.message || "Signup failed. Please try again.";
//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//       <div className="card w-full max-w-sm shadow-2xl bg-[#1a1a2e] border border-cyan-500 text-white">
//         <form onSubmit={handleSignup} className="card-body">
//           <h2 className="card-title justify-center text-3xl font-bold text-cyan-400 mb-2">
//             Sign Up
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
//               {loading ? "Signing up..." : "Sign Up"}
//             </button>
//           </div>

//           <p className="mt-4 text-center text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link to="/login" className="text-cyan-300 hover:underline font-medium">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React from "react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import AuthForm from "@/components/auth/AuthForm";

const Signup = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthSidebar
        title="Join Labsync"
        subtitle="Create your account and start collaborating today."
      />
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;






