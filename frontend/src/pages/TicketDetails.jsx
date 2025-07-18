import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Navbar from "../components/Navbar.jsx"

export default function TicketDetails() {
  const { id } = useParams();
  console.log('checking id from ticket details', id)
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('single ticket details:', res.data.ticket)
        setTicket(res.data.ticket);
      }
      catch (err) {
        console.error("Fetch ticket error from ticket details:", err);
        const msg = err.response?.data?.message || "Something went wrong";
        alert(msg);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10">Loading ticket details...</div>;
  if (!ticket) return <div className="text-center mt-10">Ticket not found</div>;

  return (
    <>
    <Navbar />
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>

      <div className="card bg-gray-800 shadow p-4 space-y-4">
        <h3 className="text-xl font-semibold">{ticket.title || "Untitled Ticket"}</h3>
        <p>{ticket.description || "No description available."}</p>

        {/* Conditionally render extended details */}
        {ticket && (
          <>
            <div className="divider">Metadata</div>
            <p>
              <strong>Status:</strong> {ticket.status || "Unknown"}
            </p>
            <p>
              <strong>Priority:</strong> {ticket.priority || "Unknown"}
            </p>
            <p>
              <strong>Related Skills:</strong>{" "}
              {ticket.relatedSkills?.length > 0
                ? ticket.relatedSkills.join(", ")
                : "None"}
            </p>
            <div>
              <strong>Helpful Notes:</strong>
              <div className="prose max-w-none rounded mt-2">
                <ReactMarkdown>
                  {ticket.helpfulNotes || "No notes available."}
                </ReactMarkdown>
              </div>
            </div>
            <p>
              <strong>Assigned To:</strong>{" "}
              {ticket.assignedTo?.email || "Unassigned"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Created At:{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : "Unknown"}
            </p>
          </>
        )}
      </div>
    </div>
    </>
  );
}
