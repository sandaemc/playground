import middy from 'middy'
import { jsonBodyParser } from 'middy/middlewares'
import { post } from '../lib/api'

export async function index(event: any) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Slack Messenger v1',
        input: event
      },
      null,
      2
    )
  }
}

export const send = middy(async (event: any) => {
  const { botToken, channel, text, threadId } = event.body

  try {
    await post(botToken)({
      channel,
      text,
      threadId
    })

    return { statusCode: 200 }
  } catch (e) {
    console.error(e)
    return { statusCode: 500 }
  }
}).use(jsonBodyParser())
