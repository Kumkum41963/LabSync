import dotenv from "dotenv";
dotenv.config({ path: "../.env" });  // ⬅️ this loads MONGO_URI properly

import mongoose from "mongoose";
import User from "../models/user.model.js";
import Ticket from "../models/ticket.model.js";

async function run() {
    console.log('mongo conn str:', process.env.MONGO_URI)
    try {
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

        console.log("🔄 Syncing indexes...");

        await User.syncIndexes();
        console.log("✔ User indexes synced");

        await Ticket.syncIndexes();
        console.log("✔ Ticket indexes synced");

        console.log("🎉 All indexes synced successfully!");
        await mongoose.disconnect();
        console.log("🔌 Disconnected");
    } catch (err) {
        console.error("❌ Error syncing indexes:", err);
    }
}

run();
