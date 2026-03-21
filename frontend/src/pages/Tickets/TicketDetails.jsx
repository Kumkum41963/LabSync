import {  Sparkles, User, Clock, Tag } from "lucide-react";
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

  const ticket = tickets.find(t => t._id === id);

  useEffect(() => {
    const load = async () => {
      if (!ticket) {
        await getTicketById(id);
      }
      setLoading(false);
    };
    load();
  }, [id]); // keep minimal deps

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
       <BackBtn/>

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
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Sparkles className="w-10 h-10 mb-4 opacity-40" />
              <p className="max-w-md">
                Click <span className="text-foreground font-medium">"Generate Analysis"</span> for AI insights.
              </p>
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