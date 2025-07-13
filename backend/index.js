import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user";
import ticketRoutes from "./routes/ticket";

import { serve } from "inngest/express";

import { inngest } from "./inngest/client";
import { onUserSignup } from "./inngest/functions/on-signup";
import { onTicketCreated } from "./inngest/functions/on-ticket-create";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.use("/api/tickets", ticketRoutes);

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
