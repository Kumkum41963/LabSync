// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx";

// export default function Admin() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({ role: "", skills: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/users`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers(res.data);
//       setFilteredUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users", err.response?.data || err.message);
//     }
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user.email);
//     setFormData({
//       role: user.role,
//       skills: user.skills?.join(", "),
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/auth/update-user`,
//         {
//           email: editingUser,
//           role: formData.role,
//           skills: formData.skills
//             .split(",")
//             .map((skill) => skill.trim())
//             .filter(Boolean),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setEditingUser(null);
//       setFormData({ role: "", skills: "" });
//       fetchUsers();
//     } catch (err) {
//       console.error("Update failed", err.response?.data || err.message);
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     setFilteredUsers(
//       users.filter((user) => user.email.toLowerCase().includes(query))
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-6 text-cyan-400">
//             Admin Panel – Manage Users
//           </h1>

//           <input
//             type="text"
//             className="input input-bordered w-full mb-6 bg-[#0f172a] border border-cyan-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
//             placeholder="Search by email"
//             value={searchQuery}
//             onChange={handleSearch}
//           />

//           {filteredUsers.map((user) => (
//             <div
//               key={user._id}
//               className="bg-[#1a1a2e] rounded-lg shadow-xl p-5 mb-6 border border-cyan-700 hover:shadow-cyan-500/20 transition-all duration-300"
//             >
//               <p><span className="text-cyan-300 font-semibold">Email:</span> {user.email}</p>
//               <p><span className="text-cyan-300 font-semibold">Role:</span> {user.role}</p>
//               <p><span className="text-cyan-300 font-semibold">Skills:</span> {user.skills?.length > 0 ? user.skills.join(", ") : "N/A"}</p>

//               {editingUser === user.email ? (
//                 <div className="mt-4 space-y-2">
//                   <select
//                     className="select select-bordered w-full bg-[#0f172a] border border-cyan-500 text-white"
//                     value={formData.role}
//                     onChange={(e) =>
//                       setFormData({ ...formData, role: e.target.value })
//                     }
//                   >
//                     <option value="user">User</option>
//                     <option value="moderator">Moderator</option>
//                     <option value="admin">Admin</option>
//                   </select>

//                   <input
//                     type="text"
//                     placeholder="Comma-separated skills"
//                     className="input input-bordered w-full bg-[#0f172a] border border-cyan-500 text-white"
//                     value={formData.skills}
//                     onChange={(e) =>
//                       setFormData({ ...formData, skills: e.target.value })
//                     }
//                   />

//                   <div className="flex gap-2 mt-2">
//                     <button
//                       className="btn bg-cyan-500 text-white hover:bg-cyan-400 btn-sm"
//                       onClick={handleUpdate}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="btn bg-gray-700 text-white hover:bg-gray-600 btn-sm"
//                       onClick={() => setEditingUser(null)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <button
//                   className="btn btn-sm mt-4 bg-sky-600 text-white hover:bg-sky-500 transition-all"
//                   onClick={() => handleEditClick(user)}
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }



import React from 'react'
import { Shield, Users, Settings, Construction } from 'lucide-react'

const Admin = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Manage users, settings, and system configurations
        </p>
      </div>

      {/* Admin Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">User Management</h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">
            Manage user accounts, roles, and permissions
          </p>
        </div>

        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">System Settings</h3>
            <Settings className="w-5 h-5 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm">
            Configure system-wide settings and preferences
          </p>
        </div>

        <div className="glass-panel border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reports</h3>
            <div className="w-5 h-5 rounded-full bg-primary"></div>
          </div>
          <p className="text-muted-foreground text-sm">
            View system logs and administrative reports
          </p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="glass-panel border border-border rounded-lg p-12 text-center space-y-6">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-primary opacity-50" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Admin Features in Development</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced admin controls are being developed. These will include comprehensive user management, system configuration, audit logs, and reporting tools.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Admin