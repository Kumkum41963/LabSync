import { NonRetriableError } from "inngest";
import { inngest } from "../client.js";
import Ticket from "../../models/ticket.model.js";
import { analyzeTicket } from "../../utils/aiAgent.js";

export const onTicketUpdated = inngest.createFunction(
  { id: "on-ticket-updated", retries: 2 }, // key
  { event: "ticket/updated" }, // trigerring

  async ({ event, step }) => {
    // Extract data and id
    const { ticketId, changedFields } = event.data;

    if (!ticketId) {
      throw new NonRetriableError("ticketId missing");
    }

    console.log("ticketId received:", ticketId);
    console.log("changedFields:", changedFields);

    // Fetch data from the db via id
    const ticket = await step.run("fetch-ticket", async () => {
      return await Ticket.findById(ticketId);
    });

    if (!ticket) {
      throw new NonRetriableError("Ticket not found");
    }

    console.log("ticket fetched:", ticket._id.toString());

    // Conditional check to see if reprocessing req. based on whether the dependent fields changed or not
    const shouldReprocess = changedFields?.some((field) =>
      ["title", "description", "tags"].includes(field)
    );

    if (!shouldReprocess) {
      console.log("Skipping AI processing");
      return { skipped: true };
    }

    console.log("Reprocessing required");

    // Do something with the data
    const aiResult = await step.run("reanalyze-ticket", async () => {
      return await analyzeTicket(ticket);
    });

    console.log("aiResult done:", aiResult);

    // Update the tickets result in db
    const updatedTicket = await step.run("update-ticket", async () => {
      return await Ticket.findByIdAndUpdate(
        ticketId,
        {
          aiSummary: aiResult.summary,
          priority: aiResult.priority,
          relatedSkills: aiResult.relatedSkills,
        },
        { new: true }
      );
    });

    console.log("ticket updated:", updatedTicket._id.toString());

    // Return success or failure
    console.log("onTicketUpdated flow completed");

    return { success: true, ticketId };
  }
);