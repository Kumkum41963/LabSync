import React from 'react'

const TicketTags = ({ tags = [] }) => {
    // no tags available
    if (!tags.length) return null;
  return (
   <div className="flex flex-wrap gap-1 mt-2">
      {tags.map(tag => (
        <Badge key={tag} className="bg-slate-700 text-gray-300 border-slate-600">
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export default TicketTags