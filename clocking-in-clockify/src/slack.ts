import fetch from "node-fetch";

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || "";
if (!SLACK_BOT_TOKEN.length) {
  throw new Error("SLACK_BOT_TOKEN is undefined");
}

export async function post(channel: string, text: string) {
  try {
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        channel,
        text,
        as_user: true
      })
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error("Sending failed - " + data.message);
    }

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Problem");
  }
}
