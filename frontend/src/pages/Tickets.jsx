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
    setFetchLoading(true); setError("");
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("[Tickets] Fetched:", res.data);
      setTickets(res.data.tickets ?? []);
    } catch (err) {
      setError("Failed to fetch tickets."); console.error(err);
    } finally {
      setFetchLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    if (!token) return setError("Log in first.");
    setSubmitLoading(true); setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tickets`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("[Tickets] Created:", res.data.ticket);
      setForm({ title: "", description: "" });
      setTickets(prev => [res.data.ticket, ...prev]);
      setTimeout(fetchTickets, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Create failed."); console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="Title" className="input input-bordered w-full" required />
          <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Description" className="textarea textarea-bordered w-full" required />
          <button type="submit" className="btn btn-primary" disabled={submitLoading}>
            {submitLoading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
        {fetchLoading ? (
          <p>Loading tickets...</p>
        ) : (
          <div className="space-y-3">
            {tickets.length > 0 ? tickets.map(t => (
              <Link key={t._id} to={`/tickets/${t._id}`} className="card shadow-md p-4 bg-gray-800">
                <h3 className="font-bold text-lg">{t.title}</h3>
                <p className="text-sm">{t.description}</p>
                <p className="text-xs text-gray-400">
                  Status: {t.status} | Priority: {t.priority}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(t.createdAt).toLocaleString()}
                </p>
              </Link>
            )) : <p>No tickets yet.</p>}
          </div>
        )}
      </div>
    </>
  );
}
