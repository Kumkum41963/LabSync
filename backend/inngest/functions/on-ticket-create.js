import { NonRetriableError } from "inngest";
import { analyzeTicket } from "../../utils/aiAgent.js";
import { sendMail } from '../../utils/mailer.js';
import Ticket from "../../models/ticket.model.js";
import User from "../../models/user.model.js";
import { inngest } from '../client.js';

export const onTicketCreated = inngest.createFunction(
    { id: 'on-ticket-created', retries: 2 }, // key
    { event: 'ticket/created' }, // trigerring
    async ({ event, step }) => {
        const ticketId = event.data.ticketId;
        console.log("[pipeline] Starting for ticket:", ticketId);

        try {
            // fetch ticket from DB
            const ticket = await step.run("fetch-ticket", async () => {
                const t = await Ticket.findById(ticketId);
                if (!t) throw new NonRetriableError("Ticket not found");
                return t;
            });

            // sens this to aiAgent for its work 
            const aiResponse = await analyzeTicket(ticket);
            console.log("[pipeline] AI response:", aiResponse);

            // set response of ai to data 
            let relatedSkills = [];
            await step.run("apply-ai", async () => {
                // no response
                if (!aiResponse) {
                    console.warn("[pipeline] No AI response — skipping AI update");
                    return;
                }

                // set skills
                relatedSkills = Array.isArray(aiResponse.relatedSkills) ? aiResponse.relatedSkills : [];
                const priority = ['low', 'medium', 'high', 'urgent'].includes(aiResponse.priority)
                    ? aiResponse.priority
                    : 'medium';

                // update in the DB
                await Ticket.findByIdAndUpdate(ticket._id, {
                    status: 'in_progress',
                    priority,
                    helpfulNotes: aiResponse.helpfulNotes || '',
                    relatedSkills
                });
            });

            // set moderator based on skills
            const moderator = await step.run("assign-moderator", async () => {
                let mod = await User.findOne({
                    role: 'moderator',
                    skills: { $elemMatch: { $regex: relatedSkills.join("|"), $options: 'i' } }
                });
                if (!mod) mod = await User.findOne({ role: 'admin' });

                // update assignment
                await Ticket.findByIdAndUpdate(ticket._id, {
                    assignedTo: mod ? mod._id : null
                });
                return mod;
            });

            // send mail
            await step.run("notify", async () => {
                if (!moderator) return;
                await sendMail(
                    moderator.email,
                    "New Ticket Assigned",
                    `You’ve been assigned ticket: "${ticket.title}"`
                );
            });

            // get final updated ticket from DB and return
            const finalTicket = await Ticket.findById(ticketId).populate('assignedTo', ['email', '_id']);
            console.log("[pipeline] Completed for finalTicket:", finalTicket)
            console.log("[pipeline] Completed for ticket:", finalTicket._id.toString());

            return { success: true, ticket: finalTicket };
        } catch (err) {
            console.error("[pipeline] Error:", err);
            return { success: false, error: err.message };
        }
    }
);
