import db from "./db";
import { v4 } from "uuid";

type COLOR = "BLUE" | "ORANGE";
type DAY = "SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA";

class Schedule {
  constructor(public day: DAY, public goal: number) {}
}

export class Task {
  constructor(public name: string) {}
}

export class Project {
  constructor(
    public id: string,
    public name: string,
    public color: COLOR,
    public tasks: Task[],
    public schedules: Schedule[]
  ) {}
}

const projectTable = db.get("projects");

export function addProject(
  values: Omit<Project, "id" | "tasks" | "schedules" | "color">
) {
  projectTable
    .push({
      id: v4(),
      tasks: [],
      schedules: [
          { day: 'MO', goal: 0},
          { day: 'TU', goal: 0},
          { day: 'WE', goal: 0},
          { day: 'TH', goal: 0},
          { day: 'FR', goal: 0}
      ],
      color: "BLUE",
      ...values
    })
    .write();
}

export function findProjects(): Project[] {
  const data = projectTable.value();
  return data.map(
    (record: any) =>
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
  const record = projectTable.find({ id }).value();

  return new Project(
    record.id,
    record.name,
    record.color,
    record.tasks.map((c: any) => new Task(c.name)),
    record.schedules.map((c: any) => new Schedule(c.day, c.goal))
  );
}
