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
        // Extract Id from event data 
        // 
  },
);

