import { inngest } from "../client";

export const onTicketUpdated = inngest.createFunction(
    { id: 'on-ticket-updated', retries: 2 }, // key
    { triggers: [{ event: "ticket/updated" }, changedFields] }, // trigerring
    async ({event, step}) => {
        
    }
)

