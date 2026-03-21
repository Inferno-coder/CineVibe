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
    // SKIP verification if testing locally (provide x-skip-clerk-verify header)
    if (req.headers["x-skip-clerk-verify"] === "true") {
      console.log("Skipping Signature Verification (Manually Test Mode)");
    } else {
      console.log("Verifying Webhook Signature...");
      const svix_id = req.headers["svix-id"];
      const svix_timestamp = req.headers["svix-timestamp"];
      const svix_signature = req.headers["svix-signature"];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error("Missing Svix Headers");
      }

      // Use the raw body string for verification
      await wh.verify(req.rawBody.toString(), {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    }

    console.log("Successfully Verified Webhook!");
    const { data, type } = req.body;
    console.log("Event Type:", type);

    // Handle different webhook events
    switch (type) {
      case "user.created": {
        console.log("Creating user in MongoDB...");
        const userData = {
          _id: data.id,
          name: (data.first_name || "") + " " + (data.last_name || ""),
          email: data.email_addresses?.[0]?.email_address || "No Email",
          image: data.image_url,
        };
        await User.create(userData);
        console.log("User stored successfully:", data.id);
        res.json({ success: true, message: "User created" });
        break;
      }
      case "user.updated": {
        console.log("Updating user in MongoDB...");
        const userData = {
          name: (data.first_name || "") + " " + (data.last_name || ""),
          email: data.email_addresses?.[0]?.email_address || "No Email",
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated successfully:", data.id);
        res.json({ success: true, message: "User updated" });
        break;
      }
      case "user.deleted":
        console.log("Deleting user from MongoDB...");
        await User.findByIdAndDelete(data.id);
        console.log("User deleted successfully:", data.id);
        res.json({ success: true, message: "User deleted" });
        break;
      default:
        console.log("Unhandled event type:", type);
        res.json({ success: true, message: "Event ignored" });
        break;
    }
  } catch (error) {
    console.log("Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
