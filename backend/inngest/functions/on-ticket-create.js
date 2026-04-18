import { NonRetriableError } from "inngest";
import { analyzeTicket } from "../../utils/aiAgent.js";
import { sendMail } from "../../utils/mailer.js";
import Ticket from "../../models/ticket.model.js";
import User from "../../models/user.model.js";
import { inngest } from "../client.js";
import { suggestModerators } from "../../utils/modSuggestion.js";

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 }, // key
  { event: "ticket/created" }, // trigerring

  async ({ event, step }) => {
    // Extract Id from event data
    const { ticketId } = event.data;

    if (!ticketId) {
      throw new NonRetriableError("No ticket ID provided");
    }

    console.log("ticketId received:", ticketId);

    // Fetch the ticket details from db using that id
    const ticket = await step.run("fetch-ticket", async () => {
      return await Ticket.findById(ticketId);
    });

    if (!ticket) {
      throw new NonRetriableError("Ticket not found");
    }

    console.log("ticket fetched:", ticket._id.toString());

    // Call the agent to analyze the ticket basically run the prompt over it
    // NO manual step.run here. Otherwise with analyzeTicket a nested loop will form thus.
    console.log("Calling the agent...");
    const aiResult = await analyzeTicket(ticket);
    console.log("aiResult done:", aiResult);

    // Suggest moderators to ticket based on the related skills
    const suggestedMods = await step.run("suggest-mods", async () => {
      return await suggestModerators(aiResult.relatedSkills, 3);
    });

    console.log(
      "suggested moderators:",
      suggestedMods.map((m) => m._id.toString())
    );

    // Pick top moderator as assigned
    const assignedModerator = suggestedMods[0]?._id || null;

    console.log("assignedModerator:", assignedModerator?.toString());

    // Update the ticket from the response
    const updatedTicket = await step.run("update-ticket", async () => {
      return await Ticket.findByIdAndUpdate(
        ticketId,
        {
          aiSummary: aiResult.summary,
          priority: aiResult.priority,
          relatedSkills: aiResult.relatedSkills,
          assignedModerator: assignedModerator,
          suggestedModerators: suggestedMods.map((mod) => mod._id),
        },
        { new: true }
      );
    });

    console.log("ticket updated:", updatedTicket._id.toString());

    // send mail to assigned agent (mods or so)
    if (assignedModerator) {
      await step.run("send-mail", async () => {
        const mod = await User.findById(assignedModerator);

        console.log("sending mail to:", mod?.email);

        if (mod?.email) {
          await sendMail({
            to: mod.email,
            subject: "New Ticket Assigned",
            text: `Ticket: ${updatedTicket.title}\nPriority: ${updatedTicket.priority}`,
          });
        }
      });

      console.log("mail step done");
    }

    // return success message
    console.log("onTicketCreated flow completed");

    return { success: true, ticketId };
  }
);