import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";

const TicketInfoGrid = ({ status, priority, createdBy, assignedTo, assignedBy, }) => {
    const infoItems = [
        {
            label: "Status",
            content: <TicketStatusBadge status={status} />,
        },
        {
            label: "Priority",
            content: <TicketPriorityBadge priority={priority} />,
        },
        {
            label: "Created By",
            content: (
                <div className="flex items-center gap-2">
                    <img
                        src={createdBy?.avatar || "https://via.placeholder.com/32"}
                        alt=""
                        className="w-8 h-8 rounded-full border border-slate-700"
                    />
                    <span>{createdBy?.name || "Unknown"}</span>
                </div>
            ),
        },
        {
            label: "Assigned To",
            content: assignedTo?.name || (
                <span className="text-gray-500 italic">Not assigned</span>
            ),
        },
        {
            label: "Assigned By",
            content: assignedBy?.name || (
                <span className="text-gray-500 italic">Not specified</span>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {infoItems.map((item, idx) => (
                <div
                    key={idx}
                    className="p-4 border border-border rounded-xl bg-card/60 hover:bg-card/80 transition-all shadow-inner shadow-primary/25"
                >
                    <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                    <div className="text-sm">{item.content}</div>
                </div>
            ))}
        </div>
    );
};

export default TicketInfoGrid;
