import { inngest } from "./client.js"

export const fireEvent = async (eventName, data) => {
    try {
        await inngest.send({ eventName, data })
        console.log("📨 Event sent successfully", {
            event: name,
            ticketId: data?.ticketId || null,
        });

    } catch (error) {
        console.error("❌ Failed to fire Inngest event", {
            event: name,
            ticketId: data?.ticketId || null,
            errorMessage: error.message,
            stack: error.stack,
            payload: data,
        });
    }
}