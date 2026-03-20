import { Webhook } from "svix";
import { inngest } from "../inggest/index.js";

// API Controller Function to Manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with Clerk Webhook Secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook signature
    await wh.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    // Handle different webhook events
    switch (type) {
      case "user.created":
        await inngest.send({ name: "user/created", data });
        res.json({ success: true, message: "User created event sent to Inngest" });
        break;
      case "user.updated":
        await inngest.send({ name: "user/updated", data });
        res.json({ success: true, message: "User updated event sent to Inngest" });
        break;
      case "user.deleted":
        await inngest.send({ name: "user/deleted", data });
        res.json({ success: true, message: "User deleted event sent to Inngest" });
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
