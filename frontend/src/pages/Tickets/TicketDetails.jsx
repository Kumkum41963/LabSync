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

// const statusBadge = (status) => {
//   const base = "px-2 py-0.5 rounded-md text-xs font-semibold";
//   switch (status.toLowerCase()) {
//     case "open":
//       return `${base} bg-blue-600 text-white`;
//     case "in_progress":
//       return `${base} bg-yellow-400 text-black`;
//     case "resolved":
//       return `${base} bg-sky-500 text-black`;
//     case "closed":
//       return `${base} bg-gray-500 text-white`;
//     default:
//       return `${base} bg-gray-500 text-white`;
//   }
// };

// const priorityBadge = (priority) => {
//   const base = "px-2 py-0.5 rounded-md text-xs font-semibold";
//   switch (priority.toLowerCase()) {
//     case "high":
//       return `${base} bg-pink-600 text-white`;
//     case "medium":
//       return `${base} bg-amber-400 text-black`;
//     case "low":
//       return `${base} bg-blue-400 text-black`;
//     default:
//       return `${base} bg-gray-500 text-white`;
//   }
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
//         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/tickets/${id}`, {
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

//     // start re-fetching
//     interval = setInterval(() => {
//       if (
//         // not yet fetched the ai response
//         ticket &&
//         (ticket.status === "open" ||
//           (ticket.status === "in_progress" &&
//             (!ticket.helpfulNotes || ticket.relatedSkills.length === 0)))
//       ) {
//         fetch(); // re fetch 
//       } else clearInterval(interval); // stop fetching now
//     }, 3000);

//     return () => clearInterval(interval); 
//   }, [id, token, ticket]);

//   if (loading) return <div className="mt-10 text-center text-gray-300">Loading...</div>;
//   if (!ticket) return <div className="mt-10 text-center text-red-400">Ticket not found.</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-4 text-white">
//         <h2 className="text-3xl font-bold mb-6 text-sky-400">🎫 Ticket Details</h2>

//         <div className="rounded-xl bg-[#243447] shadow-lg shadow-blue-900/30 border border-gray-700 p-6 space-y-5">
//           <h3 className="text-2xl font-semibold text-cyan-300">{ticket.title}</h3> 

//           <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>

//           <div className="flex flex-wrap gap-3 items-center border-t border-gray-700 pt-4">
//             <span className={statusBadge(ticket.status)}>{readableStatus[ticket.status]}</span>
//             <span className={priorityBadge(ticket.priority)}>{ticket.priority} priority</span>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4 text-sm mt-4">
//             <div>
//               <span className="font-semibold text-gray-400">🛠️ Related Skills: </span>
//               <span className="text-cyan-300">
//                 {ticket.relatedSkills?.length ? ticket.relatedSkills.join(", ") : "N/A"}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold text-gray-400">👤 Assigned To: </span>
//               <span className="text-orange-300">{ticket.assignedTo?.email || "Unassigned"}</span>
//             </div>
//           </div>

//           <div>
//             <span className="font-semibold text-gray-400">📚 Helpful Notes:</span>
//             <div className="prose prose-invert prose-sm mt-2 text-gray-200">
//               <ReactMarkdown>{ticket.helpfulNotes || "_Awaiting AI notes..._"}</ReactMarkdown>
//             </div>
//           </div>

//           <div className="text-xs text-gray-500 pt-4">
//             <div>📅 Created: <span className="text-sky-400">{new Date(ticket.createdAt).toLocaleString()}</span></div>
//             <div>🔄 Last Updated: <span className="text-sky-400">{new Date(ticket.updatedAt).toLocaleString()}</span></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React from 'react'

const TicketDetails = () => {
  return (
    <div>TicketDetails</div>
  )
}

export default TicketDetails



// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useTickets } from "@/hooks/useTickets";
// import TicketStatusBadge from "@/components/tickets/TicketStatusBadge";
// import TicketPriorityBadge from "@/components/tickets/TicketPriorityBadge";
// import TicketTags from "@/components/tickets/TicketTags";

// export default function TicketDetailsPage() {
//   const { id } = useParams();
//   const { fetchTicketById } = useTickets();
//   const [ticket, setTicket] = useState(null);

//   useEffect(() => {
//     fetchTicketById(id).then(setTicket);
//   }, [id]);

//   if (!ticket)
//     return <p className="text-gray-400 p-6">Loading ticket...</p>;

//   return (
//     <div className="p-6 text-gray-100">
//       <h1 className="text-3xl text-indigo-400 font-semibold mb-2">
//         {ticket.title}
//       </h1>
//       <div className="flex gap-2 mb-4">
//         <TicketPriorityBadge priority={ticket.priority} />
//         <TicketStatusBadge status={ticket.status} />
//       </div>
//       <p className="text-gray-300 mb-3">{ticket.description}</p>
//       <TicketTags tags={ticket.tags} />
//     </div>
//   );
// }
