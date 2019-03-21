import * as twilio from "twilio";

export function record() {
  const response = new twilio.twiml.VoiceResponse();

  response.say(
    "Please leave a message at the beep.\nPress the star key when finished."
  );

  response.record({
    timeout: 10,
    finishOnKey: "#"
  });

  response.say("I did not receive a recording");

  return response;
}
