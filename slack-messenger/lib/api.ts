import axios from 'axios'
import assert from 'assert'

const instance = axios.create({
  baseURL: 'https://slack.com/api'
})

interface Payload {
  channel: string
  text: string
  threadId?: string
}

export function post(botToken: string) {
  assert(botToken && botToken.length, 'Bot Token is required')

  return async function(payload: Payload) {
    assert(payload.channel && payload.channel.length, 'Channel is required')
    assert(payload.text && payload.text.length, 'Text is required')

    if (payload.threadId && payload.threadId.length) {
      payload['thread_ts'] = payload.threadId
      delete payload['threadId']
    }

    const { data } = await instance.post(
      '/chat.postMessage',
      { ...payload, as_user: true },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${botToken}`
        }
      }
    )

    if (!data.ok) throw new Error(data.error)

    return data
  }
}
