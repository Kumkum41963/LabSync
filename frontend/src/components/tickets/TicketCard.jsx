import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";
import TicketTags from "./TicketTags";
import { ticketColors } from "@/lib/ticketColors";

const TicketCard = ({ ticket, onClick }) => {
  return (
     <Card
      onClick={onClick}
      className={`cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-900/30 ${ticketColors.bgCard}`}
    >
      <CardHeader>
        <CardTitle className={`${ticketColors.textPrimary} text-lg`}>
          {ticket.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className={`${ticketColors.textSecondary} mb-3`}>
          {ticket.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-2">
          <TicketPriorityBadge priority={ticket.priority} />
          <TicketStatusBadge status={ticket.status} />
        </div>

        <TicketTags tags={ticket.tags} />
      </CardContent>
    </Card>
  )
}

export default TicketCard