import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateTicket({ ticket }) {
  const { updateTicket } = useTickets();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      await updateTicket(formData, ticket._id);
      console.log("Ticket Updated Successfully!");
      navigate(`/tickets/${ticket._id}`); // redirect back to details
    } catch (error) {
      console.error("Failed to update ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 glass-panel border border-border rounded-lg">
      <div>
        <h1 className="text-2xl font-semibold glass-heading">Update Your Ticket</h1>
        <p className="text-muted-foreground text-sm mt-2">Modify the ticket details</p>
      </div>
      <TicketForm
        key={ticket._id} // ensure on mount changes are actually applied
        initialData={ticket}
        onSubmit={handleUpdate}
        loading={isSubmitting}
        submitLabel="Update Ticket"
      />
    </div>
  );
}