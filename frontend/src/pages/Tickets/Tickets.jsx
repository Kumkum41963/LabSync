import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/tickets`, {
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
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/tickets`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", description: "" });
      setTickets((prev) => [res.data.ticket, ...prev]);
      setTimeout(fetchTickets, 3000); // 3s delay been kept
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
    
      <div className="max-w-5xl mx-auto px-4 py-8 text-white">
        {/* <h2 className="text-3xl font-bold text-sky-400 mb-6">Submit a Ticket</h2>

        {error && <p className="text-rose-400 mb-4 font-medium">{error}</p>} */}

        {/* <form
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
          >
          </textarea>
          <button
            type="submit"
            className="btn w-full md:w-auto bg-sky-600 text-white hover:bg-sky-500"
            disabled={submitLoading}
          >
            {submitLoading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form> */}

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
                    {t.priority} priority
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



// import React from 'react'

// const Tickets = () => {
//   return (
//     <div>Tickets, hello this page is gonna have list of all tickets viewing.</div>
//   )
// }

// export default Tickets