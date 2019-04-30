import * as twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function play() {
  const recordings = await client.recordings.list({ limit: 1 });
  const recording: any = recordings[0];

  /*
  const recording = await client
    .recordings("RE57fa1fc2b9c6e121ec00f548067a61f7")
    .fetch();
    */

  const response = new twilio.twiml.VoiceResponse();
  response.play(
    {},
    `https://api.twilio.com/2010-04-01/Accounts/${
      process.env.TWILIO_SID
    }/Recordings/${recording.sid}`
  );

  return response;
}
