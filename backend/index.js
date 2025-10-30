import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./utils/dbConfig.js";

import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";

import { serve } from "inngest/express";

import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.use("/api/tickets", ticketRoutes);

// mount inngest on express 
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTicketCreated, onUserSignup],
  })
);

connectDB()
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));

