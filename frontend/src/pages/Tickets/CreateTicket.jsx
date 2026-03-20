import TicketForm from "@/components/tickets/TicketForm";
import { useTickets } from "@/context/TicketsContext";
import { useState } from "react";

export default function CreateTicket() {
  const { createTicket } = useTickets();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (formData) => {
    setIsSubmitting(true);
    try {
      await createTicket(formData); 
      console.log("Ticket Created Successfully!");
    } catch (error) {
      console.error("Failed to create ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 glass-panel border border-border rounded-lg">
      <div>
        <h1 className="text-2xl font-semibold glass-heading">Create New Ticket</h1>
        <p className="text-muted-foreground text-sm mt-2">Create a new support ticket for your issue</p>
      </div>
      <TicketForm 
        onSubmit={handleCreate} 
        loading={isSubmitting} 
        submitLabel="Create Ticket" 
      />
    </div>
  );
}