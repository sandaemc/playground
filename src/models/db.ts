import {v4} from 'uuid';
import {Project} from "./project";
import {Config} from "./config";

const lowdb = require('lowdb');
const LocalStorage = require('lowdb/adapters/LocalStorage');

const adapter = new LocalStorage('db');
const db = lowdb(adapter);

export type DatabaseSchema = {
    configs: Config[],
    logs: [],
    projects: Project[]
}

const defaults: DatabaseSchema = {
    configs: [
        {
            name: 'tick.sound.volume',
            value: 0.05,
            type: 'float'
        },
        {
            name: 'ding.sound.volume',
            value: 0.10,
            type: 'float'
        },
        {
            name: 'flow.sound.volume',
            value: 0.10,
            type: 'float'
        },
    ],
    logs: [],
    projects: [
        {
            id: v4(),
            name: 'Pomometer',
            color: "BLUE",
            tasks: [],
            schedules: [
                {day: 'MO', goal: 2},
                {day: 'TU', goal: 2},
                {day: 'WE', goal: 0},
                {day: 'TH', goal: 2},
                {day: 'FR', goal: 2},
            ]
        },
        {
            id: v4(),
            name: 'Work',
            color: 'ORANGE',
            tasks: [],
            schedules: [
                {day: 'MO', goal: 3},
                {day: 'TU', goal: 3},
                {day: 'WE', goal: 3},
                {day: 'TH', goal: 3},
                {day: 'FR', goal: 3}
            ]
        }
    ]
};

db.defaults(defaults).write();

export default db;