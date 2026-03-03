import { Inngest } from "inngest";
import User from "../models/User.js";
export const inngest = new Inngest({
  id: "cine-vibe",
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation",
  },
  { event: "user/created" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    await User.create(userData);
    return { message: "User Synced Successfully" };
  },
);

const syncUserDeletion = inngest.createFunction(
  {
    id: "sync-user-deletion",
  },
  { event: "user/deleted" },
  async ({ event, step }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
    return { message: "User Deleted Successfully" };
  },
);

const syncUserUpdation = inngest.createFunction(
  {
    id: "sync-user-updation",
  },
  { event: "user/updated" },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
    return { message: "User Updated Successfully" };
  },
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
