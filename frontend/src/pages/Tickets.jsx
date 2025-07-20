// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const fetchTickets = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('checking tickets diaply:', res.data.tickets)
//       setTickets(res.data.tickets || []);
//     } catch (err) {
//       console.error("Failed to fetch tickets:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/tickets`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('checking res in create ticket:',res.data)

//       setForm({ title: "", description: "" });
//       fetchTickets(); // Refresh ticket list
//     } catch (err) {
//       const message = err.response?.data?.message || "Ticket creation failed";
//       alert(message);
//       console.error("Ticket submit error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

//         <form onSubmit={handleSubmit} className="space-y-3 mb-8">
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Ticket Title"
//             className="input input-bordered w-full"
//             required
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Ticket Description"
//             className="textarea textarea-bordered w-full"
//             required
//           ></textarea>
//           <button className="btn btn-primary" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Ticket"}
//           </button>
//         </form>

//         <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
//         <div className="space-y-3">
//           {tickets.map((ticket) => (
//             <Link
//               key={ticket._id}
//               className="card shadow-md p-4 bg-gray-800"
//               to={`/tickets/${ticket._id}`}
//             >
//               <h3 className="font-bold text-lg">{ticket.title}</h3>
//               <p className="text-sm">{ticket.description}</p>
//               <p className="text-sm text-gray-500">
//                 Created At: {new Date(ticket.createdAt).toLocaleString()}
//               </p>
//             </Link>
//           ))}
//           {tickets.length === 0 && <p>No tickets submitted yet.</p>}
//         </div>
//       </div>
//     </>
//   );
// }


// import { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");
//   const fetchTickets = useCallback(async () => {
//     if (!token) return setError("You must be logged in.");
//     setFetchLoading(true); setError("");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log("[Tickets] Fetched:", res.data);
//       setTickets(res.data.tickets ?? []);
//     } catch (err) {
//       setError("Failed to fetch tickets."); console.error(err);
//     } finally {
//       setFetchLoading(false);
//     }
//   }, [token]);

//   useEffect(() => { fetchTickets(); }, [fetchTickets]);

//   const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!token) return setError("Log in first.");
//     setSubmitLoading(true); setError("");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tickets`, form, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       console.log("[Tickets] Created:", res.data.ticket);
//       setForm({ title: "", description: "" });
//       setTickets(prev => [res.data.ticket, ...prev]);
//       setTimeout(fetchTickets, 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Create failed."); console.error(err);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-3 mb-8">
//           <input name="title" value={form.title} onChange={handleChange}
//             placeholder="Title" className="input input-bordered w-full" required />
//           <textarea name="description" value={form.description} onChange={handleChange}
//             placeholder="Description" className="textarea textarea-bordered w-full" required />
//           <button type="submit" className="btn btn-primary" disabled={submitLoading}>
//             {submitLoading ? "Submitting..." : "Submit Ticket"}
//           </button>
//         </form>

//         <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
//         {fetchLoading ? (
//           <p>Loading tickets...</p>
//         ) : (
//           <div className="space-y-3">
//             {tickets.length > 0 ? tickets.map(t => (
//               <Link key={t._id} to={`/tickets/${t._id}`} className="card shadow-md p-4 bg-gray-800">
//                 <h3 className="font-bold text-lg">{t.title}</h3>
//                 <p className="text-sm">{t.description}</p>
//                 <p className="text-xs text-gray-400">
//                   Status: {t.status} | Priority: {t.priority}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Created: {new Date(t.createdAt).toLocaleString()}
//                 </p>
//               </Link>
//             )) : <p>No tickets yet.</p>}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchTickets = useCallback(async () => {
//     if (!token) return setError("You must be logged in.");
//     setFetchLoading(true);
//     setError("");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("[Tickets] Fetched:", res.data);
//       setTickets(res.data.tickets ?? []);
//     } catch (err) {
//       setError("Failed to fetch tickets.");
//       console.error(err);
//     } finally {
//       setFetchLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTickets();
//   }, [fetchTickets]);

//   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return setError("Log in first.");
//     setSubmitLoading(true);
//     setError("");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tickets`, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("[Tickets] Created:", res.data.ticket);
//       setForm({ title: "", description: "" });
//       setTickets((prev) => [res.data.ticket, ...prev]);
//       setTimeout(fetchTickets, 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Create failed.");
//       console.error(err);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 py-6 text-white">
//         <h2 className="text-3xl font-bold text-blue-400 mb-6">Create Ticket</h2>

//         {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

//         <form
//           onSubmit={handleSubmit}
//           className="bg-[#1a1b23] rounded-xl shadow-lg shadow-blue-800/20 p-6 mb-10 space-y-4"
//         >
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Enter ticket title"
//             className="input input-bordered w-full bg-[#0e0f1a] text-white border-blue-700 placeholder:text-gray-400"
//             required
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Describe the issue..."
//             className="textarea textarea-bordered w-full bg-[#0e0f1a] text-white border-blue-700 placeholder:text-gray-400"
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="btn bg-blue-600 text-white hover:bg-blue-500"
//             disabled={submitLoading}
//           >
//             {submitLoading ? "Submitting..." : "Submit Ticket"}
//           </button>
//         </form>

//         <h2 className="text-2xl font-semibold text-blue-300 mb-4">All Tickets</h2>

//         {fetchLoading ? (
//           <p className="text-gray-400">Loading tickets...</p>
//         ) : (
//           <div className="space-y-4">
//             {tickets.length > 0 ? (
//               tickets.map((t) => (
//                 <Link
//                   key={t._id}
//                   to={`/tickets/${t._id}`}
//                   className="block bg-[#1f202b] p-5 rounded-lg shadow shadow-indigo-900 hover:bg-[#262734] transition"
//                 >
//                   <h3 className="text-lg font-bold text-cyan-300">{t.title}</h3>
//                   <p className="text-sm text-gray-300 mb-1">{t.description}</p>
//                   <p className="text-xs text-purple-300">
//                     Status: <span className="font-medium">{t.status}</span> | Priority: <span className="font-medium">{t.priority}</span>
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Created: {new Date(t.createdAt).toLocaleString()}
//                   </p>
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-400">No tickets yet.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// import { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// export default function Tickets() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [tickets, setTickets] = useState([]);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchTickets = useCallback(async () => {
//     if (!token) return setError("You must be logged in.");
//     setFetchLoading(true);
//     setError("");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTickets(res.data.tickets ?? []);
//     } catch (err) {
//       setError("Failed to fetch tickets.");
//     } finally {
//       setFetchLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchTickets();
//   }, [fetchTickets]);

//   const handleChange = (e) =>
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return setError("Log in first.");
//     setSubmitLoading(true);
//     setError("");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tickets`, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setForm({ title: "", description: "" });
//       setTickets((prev) => [res.data.ticket, ...prev]);
//       setTimeout(fetchTickets, 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || "Create failed.");
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-4 py-8 text-white">
//         <h2 className="text-3xl font-bold text-sky-400 mb-6">Submit a Ticket</h2>

//         {error && <p className="text-rose-400 mb-4 font-medium">{error}</p>}

//         <form
//           onSubmit={handleSubmit}
//           className="bg-[#111827] rounded-xl shadow-xl shadow-blue-900/30 p-6 mb-12 space-y-4"
//         >
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Ticket title"
//             className="input input-bordered w-full bg-[#0f172a] text-white border border-sky-700 placeholder:text-gray-400"
//             required
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Describe the issue..."
//             className="textarea textarea-bordered w-full bg-[#0f172a] text-white border border-sky-700 placeholder:text-gray-400"
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="btn w-full md:w-auto bg-sky-600 text-white hover:bg-sky-500"
//             disabled={submitLoading}
//           >
//             {submitLoading ? "Submitting..." : "Submit Ticket"}
//           </button>
//         </form>

//         <h2 className="text-2xl font-semibold text-sky-300 mb-4">All Tickets</h2>

//         {fetchLoading ? (
//           <p className="text-gray-400">Loading tickets...</p>
//         ) : tickets.length > 0 ? (
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {tickets.map((t) => (
//               <Link
//                 key={t._id}
//                 to={`/tickets/${t._id}`}
//                 className="block bg-[#1e293b] hover:bg-[#273449] transition-colors duration-200 rounded-lg shadow-md shadow-blue-900/20 p-5"
//               >
//                 <h3 className="text-lg font-bold text-cyan-300 mb-1">{t.title}</h3>
//                 <p className="text-sm text-gray-300 mb-2 line-clamp-3">{t.description}</p>
//                 <div className="text-xs text-gray-400 space-y-1">
//                   <p>
//                     <span className="text-sky-400 font-medium">Status:</span>{" "}
//                     {t.status}
//                   </p>
//                   <p>
//                     <span className="text-sky-400 font-medium">Priority:</span>{" "}
//                     {t.priority}
//                   </p>
//                   <p>Created: {new Date(t.createdAt).toLocaleString()}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No tickets yet.</p>
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTickets = useCallback(async () => {
    if (!token) return setError("You must be logged in.");
    setFetchLoading(true);
    setError("");
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data.tickets ?? []);
    } catch (err) {
      setError("Failed to fetch tickets.");
    } finally {
      setFetchLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError("Log in first.");
    setSubmitLoading(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tickets`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", description: "" });
      setTickets((prev) => [res.data.ticket, ...prev]);
      setTimeout(fetchTickets, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Create failed.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const statusBadge = (status) => {
    const base = "px-2 py-0.5 rounded-md text-xs font-semibold";
    switch (status.toLowerCase()) {
      case "open":
        return `${base} bg-blue-600 text-white`;
      case "pending":
        return `${base} bg-yellow-400 text-black`;
      case "resolved":
        return `${base} bg-sky-500 text-black`;
      default:
        return `${base} bg-gray-500 text-white`;
    }
  };

  const priorityBadge = (priority) => {
    const base = "px-2 py-0.5 rounded-md text-xs font-semibold";
    switch (priority.toLowerCase()) {
      case "high":
        return `${base} bg-pink-600 text-white`;
      case "medium":
        return `${base} bg-amber-400 text-black`;
      case "low":
        return `${base} bg-blue-400 text-black`;
      default:
        return `${base} bg-gray-500 text-white`;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 text-white">
        <h2 className="text-3xl font-bold text-sky-400 mb-6">Submit a Ticket</h2>

        {error && <p className="text-rose-400 mb-4 font-medium">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] rounded-xl shadow-xl shadow-blue-900/30 p-6 mb-12 space-y-4"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ticket title"
            className="input input-bordered w-full bg-[#0f172a] text-white border border-sky-700 placeholder:text-gray-400"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue..."
            className="textarea textarea-bordered w-full bg-[#0f172a] text-white border border-sky-700 placeholder:text-gray-400"
            required
          ></textarea>
          <button
            type="submit"
            className="btn w-full md:w-auto bg-sky-600 text-white hover:bg-sky-500"
            disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>

        <h2 className="text-2xl font-semibold text-sky-300 mb-4">All Tickets</h2>

        {fetchLoading ? (
          <p className="text-gray-400">Loading tickets...</p>
        ) : tickets.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((t) => (
              <Link
                key={t._id}
                to={`/tickets/${t._id}`}
                className="block bg-[#243447] hover:bg-[#2c3e50] transition-colors duration-200 rounded-lg shadow-md shadow-blue-900/20 p-5"
              >
                <h3 className="text-lg font-bold text-cyan-300 mb-2">{t.title}</h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {t.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={statusBadge(t.status)}>{t.status}</span>
                  <span className={priorityBadge(t.priority)}>
                    {t.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  📅 Created:{" "}
                  <span className="text-sky-400">
                    {new Date(t.createdAt).toLocaleString()}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tickets yet.</p>
        )}
      </div>
    </>
  );
}



