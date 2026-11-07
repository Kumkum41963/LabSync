// import { Sparkles, User, Clock, Tag } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useNavigate, useParams, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useTickets } from "@/context/TicketsContext";
// import BackBtn from "@/components/tickets/BackBtn";

// export default function TicketDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { tickets, getTicketById } = useTickets();

//   const [loading, setLoading] = useState(true);

//   // Find the current ticket from context state
//   console.log("Tickets in context:", tickets);
//   const ticket = tickets.find(t => t._id === id);
//   console.log("Current ticket:", ticket);


//   useEffect(() => {
//     let isMounted = true;

//     const loadTicketData = async () => {
//       try {
//         // Fetch or refresh ticket data
//         await getTicketById(id);
//       } catch (err) {
//         console.error("Failed to load ticket:", err);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     // 1. Initial load when component mounts or ID changes
//     loadTicketData();

//     // 2. Set up Polling Loop (e.g., poll every 10 seconds)
//     const pollInterval = 10000; 
//     let timeoutId = null;

//     const poll = async () => {
//       try {
//         // Fetch latest data quietly in the background
//         await getTicketById(id);
//       } catch (err) {
//         console.error("Polling error:", err);
//       } finally {
//         // Schedule next poll only if the component is still mounted
//         if (isMounted) {
//           timeoutId = setTimeout(poll, pollInterval);
//         }
//       }
//     };

//     // Kick off the first background poll timeout after the initial load interval
//     timeoutId = setTimeout(poll, pollInterval);

//     // 3. Cleanup function when component unmounts (leaving the page)
//     return () => {
//       isMounted = false;
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [id, getTicketById]);

//   const onGenerateAI = () => {
//     console.log("Generating AI analysis for ticket:", ticket?._id);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading ticket...
//       </div>
//     );
//   }

//   if (!ticket) {
//     return <Navigate to="/tickets" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-10">
//       {/* Back + Title */}
//       <div className="flex items-start gap-4 mb-8">
//         <BackBtn />

//         <div>
//           <h1 className="text-2xl sm:text-3xl font-semibold">
//             {ticket.title}
//           </h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Ticket ID: {ticket._id}
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           <div className="glass-panel border border-border rounded-lg p-6">
//             <h2 className="text-lg font-semibold mb-4">Description</h2>
//             <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//               {ticket.description}
//             </p>
//           </div>

//           <div className="glass-panel border border-border rounded-lg p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-primary" />
//                 <h2 className="text-lg font-semibold text-primary">AI Analysis</h2>
//               </div>
//               <Button onClick={onGenerateAI} size="sm">
//                 <Sparkles className="w-4 h-4 mr-2" />
//                 Generate Analysis
//               </Button>
//             </div>

//             <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
//               {ticket.aiSummary ? (
//                 <div className="w-full text-left text-foreground leading-relaxed whitespace-pre-line">
//                   {ticket.aiSummary}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
//                   <Sparkles className="w-10 h-10 mb-4 opacity-40 animate-pulse" />
//                   <p className="text-sm">
//                     Click <span className="text-foreground font-medium">"Generate Analysis"</span> for AI insights.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="glass-panel border border-border rounded-lg p-6">
//             <h2 className="text-lg font-semibold mb-6">Details</h2>
//             <div className="space-y-5">
//               <DetailRow
//                 label="Status"
//                 value={
//                   <Badge className={`badge-${ticket.status.toLowerCase()} border`}>
//                     {ticket.status}
//                   </Badge>
//                 }
//               />
//               <DetailRow
//                 label="Priority"
//                 value={
//                   <Badge className={`badge-${ticket.priority.toLowerCase()} border`}>
//                     {ticket.priority}
//                   </Badge>
//                 }
//               />
//               <DetailRow
//                 icon={<User className="w-4 h-4" />}
//                 label="Assigned To"
//                 value={ticket.assignedTo?.name || "Unassigned"}
//               />
//               <DetailRow
//                 icon={<Clock className="w-4 h-4" />}
//                 label="Created"
//                 value={new Date(ticket.createdAt).toLocaleDateString()}
//               />
//             </div>
//           </div>

//           <div className="glass-panel border border-border rounded-lg p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <Tag className="w-4 h-4" />
//               <h2 className="text-lg font-semibold">Tags</h2>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {ticket.tags?.length ? (
//                 ticket.tags.map((tag) => (
//                   <Badge key={tag} variant="outline" className="text-xs">
//                     {tag}
//                   </Badge>
//                 ))
//               ) : (
//                 <span className="text-sm text-muted-foreground">No tags</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DetailRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <div className="flex items-center gap-2 text-muted-foreground">
//         {icon}
//         <span className="text-sm">{label}</span>
//       </div>
//       <div className="text-right font-medium text-sm">{value}</div>
//     </div>
//   );
// }


import { Sparkles, User, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTickets } from "@/context/TicketsContext";
import BackBtn from "@/components/tickets/BackBtn";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, getTicketById } = useTickets();

  const [loading, setLoading] = useState(true);

  // Find the current ticket from global state
  const ticket = tickets.find(t => t._id === id);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const loadInitialTicket = async () => {
      try {
        await getTicketById(id);
      } catch (err) {
        console.error("Failed to load ticket:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // 1. Initial fetch when component mounts or ID changes
    loadInitialTicket();

    // 2. Set up Polling Loop (e.g., every 10 seconds)
    const pollInterval = 10000; 

    const poll = async () => {
      try {
        // Fetch latest data and update global state via context
        await getTicketById(id);
      } catch (err) {
        console.error("Polling error:", err);
      } finally {
        // Schedule next poll only if component is still active
        if (isMounted) {
          timeoutId = setTimeout(poll, pollInterval);
        }
      }
    };

    // Kick off the polling loop timeout
    timeoutId = setTimeout(poll, pollInterval);

    // 3. Cleanup function when component unmounts (leaving the page)
    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [id, getTicketById]);

  const onGenerateAI = () => {
    console.log("Generating AI analysis for ticket:", ticket?._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading ticket...
      </div>
    );
  }

  if (!ticket) {
    return <Navigate to="/tickets" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-10">
      {/* Back + Title */}
      <div className="flex items-start gap-4 mb-8">
        <BackBtn />

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {ticket.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ticket ID: {ticket._id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {ticket.description}
            </p>
          </div>

          <div className="glass-panel border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-primary">AI Analysis</h2>
              </div>
              <Button onClick={onGenerateAI} size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Analysis
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
              {ticket.aiSummary ? (
                <div className="w-full text-left text-foreground leading-relaxed whitespace-pre-line">
                  {ticket.aiSummary}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <Sparkles className="w-10 h-10 mb-4 opacity-40 animate-pulse" />
                  <p className="text-sm">
                    Click <span className="text-foreground font-medium">"Generate Analysis"</span> for AI insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Details</h2>
            <div className="space-y-5">
              <DetailRow
                label="Status"
                value={
                  <Badge className={`badge-${ticket.status.toLowerCase()} border`}>
                    {ticket.status}
                  </Badge>
                }
              />
              <DetailRow
                label="Priority"
                value={
                  <Badge className={`badge-${ticket.priority.toLowerCase()} border`}>
                    {ticket.priority}
                  </Badge>
                }
              />
              <DetailRow
                icon={<User className="w-4 h-4" />}
                label="Assigned To"
                value={ticket.assignedTo?.name || "Unassigned"}
              />
              <DetailRow
                icon={<Clock className="w-4 h-4" />}
                label="Created"
                value={new Date(ticket.createdAt).toLocaleDateString()}
              />
            </div>
          </div>

          <div className="glass-panel border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4" />
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {ticket.tags?.length ? (
                ticket.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No tags</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-right font-medium text-sm">{value}</div>
    </div>
  );
}