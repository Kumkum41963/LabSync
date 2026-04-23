import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./utils/dbConfig.js";

import userRoutes from "./routes/user.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import dashboardRoute from "./routes/dashboard.route.js";

import { serve } from "inngest/express";

import { inngest } from "./inngest/client.js";
import { onUserSignup } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js";
import { onTicketUpdated } from "./inngest/functions/on-ticket-update.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",  // ✅ must match your frontend
  credentials: true,                // ✅ required since you're using withCredentials
}));
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/dashboard", dashboardRoute);

// Step 2: mount inngest on express 
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTicketCreated, onUserSignup, onTicketUpdated],
  })
);

connectDB()
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));

