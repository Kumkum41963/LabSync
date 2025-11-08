import React from 'react'

const priorityColors = {
  low: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  medium: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  high: "bg-red-500/20 text-red-300 border-red-500/30",
//   urgent: "bg-red-500/20 text-red-300 border-red-500/30",
};

const TicketPriorityBadge = ({ priority = "low" }) => {
  return (
     <Badge className={`${priorityColors[priority]} capitalize border`}>
      {priority}
    </Badge>
  )
}

export default TicketPriorityBadge