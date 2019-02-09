import { IncomingWebhook } from "@slack/client";

const webhook = new IncomingWebhook(
  //"https://hooks.slack.com/services/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"
  "https://hooks.slack.com/services/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"
);

export function send(message: string) {
  webhook.send(message, (err, res) => {
    if (err) {
      throw err;
    }

    console.log("Message sent!", res);
  });
}
