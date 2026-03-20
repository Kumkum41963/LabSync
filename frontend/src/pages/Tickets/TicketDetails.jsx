import { ArrowLeft, Sparkles, User, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function TicketDetails({ ticket }) {
  console.log(ticket.id)
  const navigate = useNavigate();

  const onBack = () => navigate(-1);
  const onGenerateAI = () => {
    console.log("Generating AI analysis for ticket:", ticket.id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-10">
      {/* Back + Title */}
      <div className="flex items-start gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/5 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {ticket.title}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Ticket ID: {ticket.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {ticket.description}
            </p>
          </div>

          <div className="glass-panel border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-primary">AI Analysis</h2>
              </div>
              <Button
                onClick={onGenerateAI}
                className="bg-primary hover:bg-primary/80 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Analysis
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <Sparkles className="w-10 h-10 mb-4 opacity-40" />
              <p className="max-w-md">
                Click <span className="text-white font-medium">"Generate Analysis"</span> for AI insights.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Details</h2>
            <div className="space-y-5">
              <DetailRow
                label="Status"
                value={
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                    {ticket.status}
                  </Badge>
                }
              />
              <DetailRow
                label="Priority"
                value={
                  <Badge className="bg-red-600/20 text-red-400 border-red-500/30">
                    {ticket.priority}
                  </Badge>
                }
              />
              <DetailRow
                icon={<User className="w-4 h-4" />}
                label="Assigned To"
                value={ticket.assignedTo || "Unassigned"}
              />
              <DetailRow
                icon={<Clock className="w-4 h-4" />}
                label="Created"
                value={new Date(ticket.createdAt).toLocaleDateString()}
              />
            </div>
          </div>

          <div className="glass-panel border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4" />
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {ticket.tags?.length ? (
                ticket.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary border border-primary/40">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No tags</span>
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
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-right font-medium">{value}</div>
    </div>
  );
}