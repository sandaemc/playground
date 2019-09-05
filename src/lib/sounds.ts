import { Howl } from 'howler';

export const tick = new Howl({
    src: [process.env.PUBLIC_URL + '/sounds/tick.mp3']
});

export const ding = new Howl({
    src: [process.env.PUBLIC_URL + '/sounds/ding.mp3']
});

export const flow = new Howl({
    src: [process.env.PUBLIC_URL + '/sounds/tally_points.mp3']
});

