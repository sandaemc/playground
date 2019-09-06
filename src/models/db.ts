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
            name: 'Work - Pomometer',
            color: 'blue',
            tasks: [
                { name: 'Sample'}
            ],
            schedules: [
                { day: "mon", goal: 3},
                { day: "wed", goal: 3}
            ]
        }
    ]
}).write();

export default db;