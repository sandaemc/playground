import axios from "axios";

const instance = axios.create({
  baseURL: "https://hooks.slack.com/services/T02660NDK/BKK4X7HEW",
  headers: {
    "Content-Type": "application/json"
  }
});

export async function post(message: string) {
  const result = await instance.post(
    `/${process.env.SLACK_CHAN_SECRET_PH_DATA}`,
    {
      text: message
    }
  );

  return result.data;
}
