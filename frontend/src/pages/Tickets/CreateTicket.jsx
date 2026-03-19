import TicketForm from "./ticketForm";

export default function CreateTicket() {
  const handleCreate = async (data) => {
    console.log("Create ticket:", data);
    // API call here
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Create Ticket</h1>
      <TicketForm onSubmit={handleCreate} submitLabel="Create Ticket" />
    </div>
  );
}
