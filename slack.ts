import { IncomingWebhook } from "@slack/client";

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL || "");

export function send(message: string) {
  webhook.send(message, (err, res) => {
    if (err) {
      throw err;
    }

    console.log("Message sent!", res);
  });
}
