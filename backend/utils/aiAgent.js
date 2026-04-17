import { createAgent, gemini } from "@inngest/agent-kit";
import { SYSTEM_PROMPT, buildUserPrompt } from "../utils/prompts.js";

export const analyzeTicket = async (ticket) => {
  console.log("analyzeTicket started");

  // Create the agent 
  const agent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "Embedded Systems Ticket Triage Assistant",
    system: SYSTEM_PROMPT,
  });

  try {
    // Build the response from the agent and parse accordingly
    const response = await agent.run(buildUserPrompt(ticket));

    // Raw response 
    const raw = response?.output?.[0]?.content || "";
    console.log("Raw AI response:", raw);

    // CLeaning raw response
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parsing cleaned response
    const parsed = JSON.parse(cleaned);

    // Compiling the result
    const result = {
      summary: parsed.summary || "No summary generated",
      priority: ["low", "medium", "high"].includes(parsed.priority)
        ? parsed.priority
        : "medium",
      helpfulNotes: parsed.helpfulNotes || "",
      relatedSkills: Array.isArray(parsed.relatedSkills)
        ? parsed.relatedSkills
        : [],
      tags: Array.isArray(parsed.tags)
        ? parsed.tags.map((t) => t.toLowerCase())
        : [],
    };

    console.log("AI parsed result:", result);

    // Return final result
    return result;
  } catch (error) {
    console.error("analyzeTicket failed:", error.message);

    // Fallback result so system not breaks
    return {
      summary: "AI failed to generate summary",
      priority: "medium",
      helpfulNotes: "",
      relatedSkills: [],
      tags: [],
    };
  }
};