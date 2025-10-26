import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected");
    app.listen(PORT, () => {
      console.log(`App running at ${process.env.APP_URL}`);
    });
  })
  .catch(err => console.error("Mongo Conn Err:", err));
