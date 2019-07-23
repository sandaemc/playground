import * as Pusher from "pusher";

const appId = process.env.PUSHER_APP_ID || "";
const key = process.env.PUSHER_KEY || "";
const secret = process.env.PUSHER_SECRET || "";
const cluster = process.env.PUSHER_CLUSTER || "";

const client = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS: true
});

export default (message: string) =>
  client.trigger("github", "review-requested", { message });
