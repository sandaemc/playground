import * as twilio from "twilio";

export function record() {
  const response = new twilio.twiml.VoiceResponse();

  response.say("Please leave a message at the beep.\n");

  response.record({
    playBeep: true
  });

  return response;
}
