import React from "react";

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-muted/80 text-foreground border border-border",
    open: "bg-primary/20 text-primary border border-primary/40",
    progress: "bg-secondary/20 text-secondary border border-secondary/40",
    closed: "bg-emerald-400/18 text-emerald-200 border border-emerald-400/40",
    high: "bg-fuchsia-500/16 text-fuchsia-200 border border-fuchsia-400/38",
    medium: "bg-indigo-500/16 text-indigo-200 border border-indigo-400/38",
    low: "bg-primary/12 text-primary/90 border border-primary/30",
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