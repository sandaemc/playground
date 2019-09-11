import db from './db';
import { v4 } from 'uuid';

enum Color {
    blue = 'blue',
    orange = 'orange'
};

enum Day {
    SU = 'SU',
    MO = 'MO',
    TU = 'TU',
    WE = 'WE',
    TH = 'TH',
    FR = 'FR',
    SA = 'SA'
}

class Schedule {
    constructor(public day: Day, public goal: number) {
    }
}

export class Task {
    constructor(public name: string) {
    }
}

export class Project {
    constructor(public id: string, public name: string, private color: Color, public tasks: Task[], public schedules: Schedule[]) {
    }
}

const projectTable = db.get('projects');

export function addProject(values: Omit<Project, 'id' | 'tasks' | 'schedules' | 'color'>) {
    projectTable.push({
        id: v4(),
        tasks: [],
        schedules: [],
        color: 'blue',
        ...values
    }).write();
}

export function findProjects(): Project[] {
    const data = projectTable.value();
    return data.map((record: any) =>
        new Project(
            record.id,
            record.name,
            record.color,
            record.tasks.map((c: any) => new Task(c.name)),
            record.schedules.map((c: any) => new Schedule(c.day, c.goal))
        )
    );
}

export function findProject(id: string): Project {
    const record = projectTable.find({id}).value();

    return new Project(
        record.id,
        record.name,
        record.color,
        record.tasks.map((c: any) => new Task(c.name)),
        record.schedules.map((c: any) => new Schedule(c.day, c.goal))
    );
}

