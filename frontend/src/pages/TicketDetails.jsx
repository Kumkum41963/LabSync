// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx";

// const readableStatus = {
//   open: "Open",
//   in_progress: "In Progress",
//   resolved: "Resolved",
//   closed: "Closed"
// };

// export default function TicketDetails() {
//   const { id } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     let interval;
//     const fetch = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setTicket(res.data.ticket);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetch();
//     interval = setInterval(() => {
//       if (ticket &&
//         (ticket.status === 'open' ||
//          (ticket.status === 'in_progress' &&
//           (!ticket.helpfulNotes || ticket.relatedSkills.length === 0)))
//       ) { fetch(); }
//       else clearInterval(interval);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [id, token, ticket]);

//   if (loading) return <div className="mt-10 text-center">Loading...</div>;
//   if (!ticket) return <div className="mt-10 text-center">Ticket not found.</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-3xl mx-auto p-4">
//         <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
//         <div className="card bg-gray-800 text-white shadow p-4 space-y-4">
//           <h3 className="text-xl font-semibold">{ticket.title}</h3>
//           <p>{ticket.description}</p>
//           <div className="divider">Metadata</div>
//           <p><strong>Status:</strong> {readableStatus[ticket.status] || ticket.status}</p>
//           <p><strong>Priority:</strong> {ticket.priority}</p>
//           <p><strong>Related Skills:</strong> {ticket.relatedSkills.join(", ")}</p>
//           <div>
//             <strong>Helpful Notes:</strong>
//             <div className="prose prose-invert mt-2">
//               <ReactMarkdown>{ticket.helpfulNotes || "Awaiting AI notes..."}</ReactMarkdown>
//             </div>
//           </div>
//           <p><strong>Assigned To:</strong> {ticket.assignedTo?.email || "Unassigned"}</p>
//           <p className="text-sm text-gray-400">
//             Created: {new Date(ticket.createdAt).toLocaleString()}
//           </p>
//           <p className="text-sm text-gray-500">
//             Last Updated: {new Date(ticket.updatedAt).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx";

// const readableStatus = {
//   open: "Open",
//   in_progress: "In Progress",
//   resolved: "Resolved",
//   closed: "Closed"
// };

// export default function TicketDetails() {
//   const { id } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     let interval;
//     const fetch = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setTicket(res.data.ticket);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetch();
//     interval = setInterval(() => {
//       if (
//         ticket &&
//         (ticket.status === "open" ||
//           (ticket.status === "in_progress" &&
//             (!ticket.helpfulNotes || ticket.relatedSkills.length === 0)))
//       ) {
//         fetch();
//       } else clearInterval(interval);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [id, token, ticket]);

//   if (loading) return <div className="mt-10 text-center text-gray-200">Loading...</div>;
//   if (!ticket) return <div className="mt-10 text-center text-red-400">Ticket not found.</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-3xl mx-auto p-4 text-gray-100">
//         <h2 className="text-3xl font-bold mb-6 text-white">🎫 Ticket Details</h2>
//         <div className="rounded-xl bg-gray-900 shadow-lg p-6 space-y-5 border border-gray-700">
//           <h3 className="text-2xl font-semibold text-indigo-400">{ticket.title}</h3>
//           <p className="text-gray-300">{ticket.description}</p>

//           <div className="border-t border-gray-700 my-4" />

//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div><span className="font-semibold text-gray-400">📌 Status:</span> <span className="text-green-300">{readableStatus[ticket.status] || ticket.status}</span></div>
//             <div><span className="font-semibold text-gray-400">⚡ Priority:</span> <span className="text-yellow-300">{ticket.priority}</span></div>
//             <div className="col-span-2">
//               <span className="font-semibold text-gray-400">🛠️ Related Skills:</span>{" "}
//               <span className="text-cyan-300">{ticket.relatedSkills.join(", ") || "N/A"}</span>
//             </div>
//           </div>

//           <div>
//             <span className="font-semibold text-gray-400">📚 Helpful Notes:</span>
//             <div className="prose prose-invert prose-sm mt-2 text-gray-200">
//               <ReactMarkdown>{ticket.helpfulNotes || "Awaiting AI notes..."}</ReactMarkdown>
//             </div>
//           </div>

//           <div><span className="font-semibold text-gray-400">👤 Assigned To:</span> <span className="text-orange-300">{ticket.assignedTo?.email || "Unassigned"}</span></div>

//           <div className="text-xs text-gray-500 pt-2">
//             <div>🕒 Created: {new Date(ticket.createdAt).toLocaleString()}</div>
//             <div>🔄 Last Updated: {new Date(ticket.updatedAt).toLocaleString()}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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

const statusBadge = (status) => {
  const base = "px-2 py-0.5 rounded-md text-xs font-semibold";
  switch (status.toLowerCase()) {
    case "open":
      return `${base} bg-blue-600 text-white`;
    case "in_progress":
      return `${base} bg-yellow-400 text-black`;
    case "resolved":
      return `${base} bg-sky-500 text-black`;
    case "closed":
      return `${base} bg-gray-500 text-white`;
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
      if (
        ticket &&
        (ticket.status === "open" ||
          (ticket.status === "in_progress" &&
            (!ticket.helpfulNotes || ticket.relatedSkills.length === 0)))
      ) {
        fetch();
      } else clearInterval(interval);
    }, 3000);

    return () => clearInterval(interval);
  }, [id, token, ticket]);

  if (loading) return <div className="mt-10 text-center text-gray-300">Loading...</div>;
  if (!ticket) return <div className="mt-10 text-center text-red-400">Ticket not found.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 text-white">
        <h2 className="text-3xl font-bold mb-6 text-sky-400">🎫 Ticket Details</h2>

        <div className="rounded-xl bg-[#243447] shadow-lg shadow-blue-900/30 border border-gray-700 p-6 space-y-5">
          <h3 className="text-2xl font-semibold text-cyan-300">{ticket.title}</h3>

          <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>

          <div className="flex flex-wrap gap-3 items-center border-t border-gray-700 pt-4">
            <span className={statusBadge(ticket.status)}>{readableStatus[ticket.status]}</span>
            <span className={priorityBadge(ticket.priority)}>{ticket.priority} Priority</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm mt-4">
            <div>
              <span className="font-semibold text-gray-400">🛠️ Related Skills: </span>
              <span className="text-cyan-300">
                {ticket.relatedSkills?.length ? ticket.relatedSkills.join(", ") : "N/A"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-400">👤 Assigned To: </span>
              <span className="text-orange-300">{ticket.assignedTo?.email || "Unassigned"}</span>
            </div>
          </div>

          <div>
            <span className="font-semibold text-gray-400">📚 Helpful Notes:</span>
            <div className="prose prose-invert prose-sm mt-2 text-gray-200">
              <ReactMarkdown>{ticket.helpfulNotes || "_Awaiting AI notes..._"}</ReactMarkdown>
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-4">
            <div>📅 Created: <span className="text-sky-400">{new Date(ticket.createdAt).toLocaleString()}</span></div>
            <div>🔄 Last Updated: <span className="text-sky-400">{new Date(ticket.updatedAt).toLocaleString()}</span></div>
          </div>
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

