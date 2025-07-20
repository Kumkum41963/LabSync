import { createAgent, gemini } from '@inngest/agent-kit'

export const analyzeTicket = async (ticket) => {
  console.log('🚀 Starting analyzeTicket...');
  console.log('📩 Received ticket:', ticket);

  const supportAgent = createAgent({
    model: gemini({
      model: 'gemini-1.5-flash-8b',
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: 'AI Ticket Triage Assistant',
    system: `You are an expert AI assistant that processes technical support tickets. 

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  console.log('🤖 Running supportAgent...');
  const response = await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
  "summary": "Short summary of the ticket",
  "priority": "high",
  "helpfulNotes": "Here are useful tips...",
  "relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}`);

// this has to be 'content' here and not context
 
  console.log('🧠 Raw AI response content:', response?.output?.[0]?.content);

  const raw = response?.output?.[0]?.content || 'raw still undefined';
  
  try {
    // Check if wrapped in markdown and strip it
    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();

    console.log('🔍 Extracted JSON string:', jsonString);

    const parsed = JSON.parse(jsonString);

    console.log('✅ Successfully parsed JSON:', parsed);

    return parsed;

  } catch (e) {
    console.error('❌ Failed to parse JSON from AI response:', e.message);
    console.log('⚠️ Raw string that failed parsing:', raw);
    return null;
  }
};



