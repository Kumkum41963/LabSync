// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx"

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
//       const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
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
//         `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
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
//       <div className="max-w-4xl mx-auto mt-10">
//         <h1 className="text-2xl font-bold mb-6">Admin Panel - Manage Users</h1>
//         <input
//           type="text"
//           className="input input-bordered w-full mb-6"
//           placeholder="Search by email"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//         {filteredUsers.map((user) => (
//           <div
//             key={user._id}
//             className="bg-base-100 shadow rounded p-4 mb-4 border"
//           >
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p>
//               <strong>Current Role:</strong> {user.role}
//             </p>
//             <p>
//               <strong>Skills:</strong>{" "}
//               {user.skills && user.skills.length > 0
//                 ? user.skills.join(", ")
//                 : "N/A"}
//             </p>

//             {editingUser === user.email ? (
//               <div className="mt-4 space-y-2">
//                 <select
//                   className="select select-bordered w-full"
//                   value={formData.role}
//                   onChange={(e) =>
//                     setFormData({ ...formData, role: e.target.value })
//                   }
//                 >
//                   <option value="user">User</option>
//                   <option value="moderator">Moderator</option>
//                   <option value="admin">Admin</option>
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="Comma-separated skills"
//                   className="input input-bordered w-full"
//                   value={formData.skills}
//                   onChange={(e) =>
//                     setFormData({ ...formData, skills: e.target.value })
//                   }
//                 />

//                 <div className="flex gap-2">
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={handleUpdate}
//                   >
//                     Save
//                   </button>
//                   <button
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setEditingUser(null)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 className="btn btn-primary btn-sm mt-2"
//                 onClick={() => handleEditClick(user)}
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </>

//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err.response?.data || err.message);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
        {
          email: editingUser,
          role: formData.role,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingUser(null);
      setFormData({ role: "", skills: "" });
      fetchUsers();
    } catch (err) {
      console.error("Update failed", err.response?.data || err.message);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-cyan-400">
            Admin Panel – Manage Users
          </h1>

          <input
            type="text"
            className="input input-bordered w-full mb-6 bg-[#0f172a] border border-cyan-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            placeholder="Search by email"
            value={searchQuery}
            onChange={handleSearch}
          />

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#1a1a2e] rounded-lg shadow-xl p-5 mb-6 border border-cyan-700 hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <p><span className="text-cyan-300 font-semibold">Email:</span> {user.email}</p>
              <p><span className="text-cyan-300 font-semibold">Role:</span> {user.role}</p>
              <p><span className="text-cyan-300 font-semibold">Skills:</span> {user.skills?.length > 0 ? user.skills.join(", ") : "N/A"}</p>

              {editingUser === user.email ? (
                <div className="mt-4 space-y-2">
                  <select
                    className="select select-bordered w-full bg-[#0f172a] border border-cyan-500 text-white"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Comma-separated skills"
                    className="input input-bordered w-full bg-[#0f172a] border border-cyan-500 text-white"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      className="btn bg-cyan-500 text-white hover:bg-cyan-400 btn-sm"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button
                      className="btn bg-gray-700 text-white hover:bg-gray-600 btn-sm"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-sm mt-4 bg-sky-600 text-white hover:bg-sky-500 transition-all"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
