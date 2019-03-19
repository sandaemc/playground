import * as twilio from "twilio";

const client = twilio(
    "ACc91e430934905bcd3d69cf7ab05d0397",
    "be4909715c4fb8b99242508fd901db6b"
);

function play() {
    client.recordings.each((recording, done, err) => recording.)
    client.recordings.each(recording => console.log(recording.sid));
}

function record() {
    const response = new twilio.twiml.VoiceResponse();

    response.say(
        "Please leave a message at the beep.\nPress the star key when finished."
    );

    response.record({
        timeout: 10,
        finishOnKey: "#"
    });

    response.say("I did not receive a recording");
}
