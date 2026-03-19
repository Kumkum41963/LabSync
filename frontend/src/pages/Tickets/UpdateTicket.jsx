import TicketForm from "./ticketForm";

export default function UpdateTicket({ ticket }) {
  const handleUpdate = async (data) => {
    console.log("Update ticket:", data);
    // API call here
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Update Ticket</h1>
      <TicketForm
        initialValues={{
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
          tags: ticket.tags?.join(", "),
        }}
        onSubmit={handleUpdate}
        submitLabel="Update Ticket"
      />
    </div>
  );
}