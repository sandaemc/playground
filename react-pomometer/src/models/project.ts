import db from "./db";
import { format } from "date-fns";

export type Color = "BLUE" | "ORANGE";
export type Day = "MO" | "TU" | "WE" | "TH" | "FR";

export type Schedule = {
  day: Day;
  goal: number;
};

export type Task = {
  name: string;
};

export type Project = {
  id: string;
  name: string;
  color: Color;
};

function mapRecordToSchedule(record: any): Schedule {
  return {
    day: record.day,
    goal: record.goal
  };
}

function mapRecordToTask(record: any): Task {
  return {
    name: record.name
  };
}

function mapRecordToProject(record: any): Project {
  return {
    id: record.id,
    name: record.name,
    color: record.color
  };
}

const projectTable = db.get("projects");

export function addProject(values: Omit<Project, "tasks">) {
  projectTable
    .push({
      tasks: [],
      ...values
    })
    .write();
}

export function findProjects(): Project[] {
  return projectTable.value().map((record: any) => mapRecordToProject(record));
}

export function findProject(id: string): Project {
  return mapRecordToProject(projectTable.find({ id }).value());
}
