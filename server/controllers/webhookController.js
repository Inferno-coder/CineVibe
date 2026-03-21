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
    console.log("Verifying Webhook Signature...");
    await wh.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("Successfully Verified Webhook!");
    const { data, type } = req.body;
    console.log("Event Type:", type);

    // Handle different webhook events
    switch (type) {
      case "user.created": {
        console.log("Creating user in MongoDB...");
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };
        await User.create(userData);
        console.log("User stored successfully:", data.id);
        res.json({ success: true, message: "User created" });
        break;
      }
      case "user.updated": {
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({ success: true, message: "User updated" });
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
    console.log("Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
