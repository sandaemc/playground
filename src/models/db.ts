import { v4 } from 'uuid';
const lowdb = require('lowdb');
const LocalStorage = require('lowdb/adapters/LocalStorage');

const adapter = new LocalStorage('db');
const db = lowdb(adapter);

db.defaults({
    configs: [
        {
            name: 'tick.sound.volume',
            value: 0.02,
            type: 'float'
        },
        {
            name: 'ding.sound.volume',
            value: 0.10,
            type: 'float'
        },
        {
            name: 'flow.sound.volume',
            value: 0.05,
            type: 'float'
        },
    ],
    projects: [
        {
            id: v4(),
            name: 'Pomometer',
            color: 'blue',
            tasks: [],
            schedules: [
                { day: "mon", goal: 3},
                { day: "fri", goal: 3}
            ]
        },
        {
            id: v4(),
            name: 'IE Data',
            color: 'red',
            tasks: [],
            schedules: [
                { day: "mon", goal: 3},
                { day: "tue", goal: 3}
            ]
        }
    ]
}).write();

export default db;