import React from "react";

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-muted text-foreground",
    open: "bg-blue-500/10 text-blue-400",
    progress: "bg-amber-500/10 text-amber-400",
    closed: "bg-emerald-500/10 text-emerald-400",
    high: "bg-red-500/10 text-red-400",
    medium: "bg-yellow-500/10 text-yellow-400",
    low: "bg-slate-500/10 text-slate-400",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-md font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const TicketMetaRow = ({ ticket }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <Badge variant={ticket.status}>
        {ticket.status}
      </Badge>

      <Badge variant={ticket.priority}>
        {ticket.priority}
      </Badge>

      {ticket.assignedTo && (
        <span className="text-muted-foreground">
          Assigned to:{" "}
          <span className="font-medium text-foreground">
            {ticket.assignedTo.name}
          </span>
        </span>
      )}

      {ticket.tags?.map((tag, i) => (
        <span
          key={i}
          className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TicketMetaRow;