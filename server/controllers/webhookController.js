import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("---------- Webhook Received ----------");
    console.log("Headers:", req.headers);
    console.log("Body Type:", typeof req.body);
    
    // Check if secret exists
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET");
    }

    // Create a Svix instance with Clerk Webhook Secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature using raw body
    try {
      const svix_id = req.headers["svix-id"];
      const svix_timestamp = req.headers["svix-timestamp"];
      const svix_signature = req.headers["svix-signature"];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ success: false, message: "Missing Svix Headers" });
      }

      await wh.verify(req.rawBody.toString(), {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.log("Webhook Verification Error:", err.message);
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }

    const { data, type } = req.body;

    // Handle different webhook events
    switch (type) {
      case "user.created":
      case "user.updated":
      case "session.created": {
        const isSession = type === "session.created";
        const userDataFromEvent = isSession ? data.user : data;

        const userData = {
          _id: userDataFromEvent.id,
          name:
            (userDataFromEvent.first_name || "") +
            " " +
            (userDataFromEvent.last_name || ""),
          email: userDataFromEvent.email_addresses?.[0]?.email_address || "No Email",
          image: userDataFromEvent.image_url,
          role: userDataFromEvent.public_metadata?.role || "user",
        };

        // Use findOneAndUpdate with upsert:true to Create or Update in one go
        await User.findOneAndUpdate({ _id: userData._id }, userData, {
          upsert: true,
          new: true,
        });

        res.json({ success: true, message: "User synced" });
        break;
      }
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "User deleted" });
        break;
      default:
        res.json({ success: true, message: "Event ignored" });
        break;
    }
  } catch (error) {
    
    res.status(400).json({ success: false, message: error.message });
  }
};
