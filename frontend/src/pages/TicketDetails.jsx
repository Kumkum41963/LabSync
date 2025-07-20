import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const readableStatus = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed"
};

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let interval;
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTicket(res.data.ticket);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
    interval = setInterval(() => {
      if (ticket &&
        (ticket.status === 'open' ||
         (ticket.status === 'in_progress' &&
          (!ticket.helpfulNotes || ticket.relatedSkills.length === 0)))
      ) { fetch(); }
      else clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, [id, token, ticket]);

  if (loading) return <div className="mt-10 text-center">Loading...</div>;
  if (!ticket) return <div className="mt-10 text-center">Ticket not found.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
        <div className="card bg-gray-800 text-white shadow p-4 space-y-4">
          <h3 className="text-xl font-semibold">{ticket.title}</h3>
          <p>{ticket.description}</p>
          <div className="divider">Metadata</div>
          <p><strong>Status:</strong> {readableStatus[ticket.status] || ticket.status}</p>
          <p><strong>Priority:</strong> {ticket.priority}</p>
          <p><strong>Related Skills:</strong> {ticket.relatedSkills.join(", ")}</p>
          <div>
            <strong>Helpful Notes:</strong>
            <div className="prose prose-invert mt-2">
              <ReactMarkdown>{ticket.helpfulNotes || "Awaiting AI notes..."}</ReactMarkdown>
            </div>
          </div>
          <p><strong>Assigned To:</strong> {ticket.assignedTo?.email || "Unassigned"}</p>
          <p className="text-sm text-gray-400">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Last Updated: {new Date(ticket.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const TicketDetails = () => {
//   const { id } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     let interval;

//     const fetchTicket = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const updatedTicket = res.data.ticket;
//         setTicket(updatedTicket);
//         setIsLoading(false);

//         // 👇 Check if AI is done enriching
//         const aiDone =
//           updatedTicket.relatedSkills?.length > 0 ||
//           updatedTicket.priority !== "LOW" ||
//           updatedTicket.status === "IN_PROGRESS" ||
//           updatedTicket.helpfulNotes?.length > 0;

//         if (aiDone && interval) {
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.error("Error fetching ticket:", err);
//       }
//     };

//     // Initial fetch
//     fetchTicket();

//     // Poll every 3 seconds
//     interval = setInterval(fetchTicket, 3000);

//     // Cleanup on unmount
//     return () => clearInterval(interval);
//   }, [id]);

//   if (isLoading || !ticket) return <div>Loading ticket details...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold">Ticket Details</h1>
//       <p><strong>Title:</strong> {ticket.title}</p>
//       <p><strong>Status:</strong> {ticket.status}</p>
//       <p><strong>Priority:</strong> {ticket.priority}</p>
//       <p><strong>Description:</strong> {ticket.description}</p>
//       <p><strong>Helpful Notes:</strong> {ticket.helpfulNotes || "Processing..."}</p>
//       <p><strong>Related Skills:</strong> 
//         {ticket.relatedSkills?.length > 0
//           ? ticket.relatedSkills.join(", ")
//           : "Processing..."}
//       </p>
//     </div>
//   );
// };

// export default TicketDetails;

