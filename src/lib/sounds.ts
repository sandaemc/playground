import { Howl } from 'howler';

export const tick = new Howl({
    src: [process.env.PUBLIC_URL + '/sounds/tick.mp3']
});

tick.volume(0.02);

export const ding = new Howl({
    src: [process.env.PUBLIC_URL + '/sounds/ding.mp3']
});

ding.volume(0.05);

export const flow = new Howl({
    src: [process.env.PUBLIC_URL + '/sounds/tally_points.mp3']
});

flow.volume(0.05);


