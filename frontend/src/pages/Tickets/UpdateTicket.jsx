import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BackBtn from "@/components/tickets/BackBtn";

export default function UpdateTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, getTicketById, updateTicket } = useTickets();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticket = tickets.find(t => t._id === id);

  // Fetch only if missing
  useEffect(() => {
    const load = async () => {
      if (!ticket) {
        await getTicketById(id);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!ticket) return <Navigate to="/tickets" replace />;

  const handleUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await updateTicket(ticket._id, formData);
      console.log("Ticket Updated Successfully!", res.data);
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
        <BackBtn/>
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