import { inngest } from "./client.js"

export const fireEvent = async (eventName, data) => {
    try {
        await inngest.send({ name: eventName, data })
        console.log("📨 Event sent successfully", {
            name: eventName,
            ticketId: data?.ticketId || null,
        });

    } catch (error) {
        console.error("❌ Failed to fire Inngest event", {
            name: eventName,
            ticketId: data?.ticketId || null,
            errorMessage: error.message,
            stack: error.stack,
            payload: data,
        });
    }
}