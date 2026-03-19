import { ArrowLeft, Sparkles, User, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TicketDetails({ ticket, onBack, onGenerateAI }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 sm:p-6 md:p-10">
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

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <div className="bg-[#11161c] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {ticket.description}
            </p>
          </div>

          {/* AI Analysis Card */}
          <div className="bg-[#11161c] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-semibold">AI Analysis</h2>
              </div>

              <Button
                onClick={onGenerateAI}
                className="bg-cyan-600 hover:bg-cyan-500 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Analysis
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <Sparkles className="w-10 h-10 mb-4 opacity-40" />
              <p className="max-w-md">
                Click <span className="text-white font-medium">"Generate Analysis"</span> to get an AI-powered analysis of this ticket including root cause analysis, impact assessment, and recommended resolution steps.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="bg-[#11161c] border border-white/10 rounded-xl p-6">
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
                icon={<User className="w-4 h-4" />}
                label="Created By"
                value={ticket.createdBy}
              />

              <DetailRow
                icon={<Clock className="w-4 h-4" />}
                label="Created"
                value={new Date(ticket.createdAt).toLocaleDateString()}
              />
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-[#11161c] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4" />
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {ticket.tags?.length ? (
                ticket.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30"
                  >
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

/* Reusable Row */
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