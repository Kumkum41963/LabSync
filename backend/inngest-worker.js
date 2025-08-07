// inngest-worker.js
import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js"; // path to your Inngest instance
import { signupConfirmation } from "./inngest/functions/signupConfirmation.js"; // your function file

const app = express();

app.use(
  serve({
    client: inngest,
    functions: [
      signupConfirmation, // add more if you have them
    ],
  })
);

const PORT = process.env.PORT_INNGEST || 3001;

app.listen(PORT, () => {
  console.log(`Inngest worker running on port ${PORT}`);
});
