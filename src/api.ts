import axios from "axios"
import * as assert from "assert"

const instance = axios.create({
  baseURL: "https://slack.com/api"
})

interface Payload {
  channel: string
  text: string
  threadId?: string
}

export function post(botToken: string) {
  assert(botToken.length, "Bot Token is required")

  return async function(payload: Payload) {
    assert(payload.channel.length, "Channel is required")
    assert(payload.text.length, "Text is required")

    if (payload.threadId) {
      payload["thread_ts"] = payload.threadId
      delete payload["threadId"]
    }

    const { data } = await instance.post(
      "/chat.postMessage",
      { ...payload, as_user: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${botToken}`
        }
      }
    )

    return data
  }
}
