import { Howl } from "howler";
import * as config from "../models/config";

export const tick = new Howl({
  src: [process.env.PUBLIC_URL + "/sounds/tick.mp3"]
});

tick.volume(config.get("tick.sound.volume"));

export const ding = new Howl({
  src: [process.env.PUBLIC_URL + "/sounds/ding.mp3"]
});

ding.volume(config.get("ding.sound.volume"));

export const flow = new Howl({
  src: [process.env.PUBLIC_URL + "/sounds/tally_points.mp3"]
});

flow.volume(config.get("flow.sound.volume"));
