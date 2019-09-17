import db from "./db";
import { Day } from "./project";
import { format } from "date-fns";

export type Log = {
  day: Day;
  date: string;
  projectId: string;
  timeSpent: number;
  flowPoint: number;
};

const logTable = db.get("logs");

function increment(key: "flowPoint" | "timeSpent", projectId: string) {
  const date = format(new Date(), "yyyy-MM-dd");
  const day = format(new Date(), "eeeeee").toUpperCase();

  const current = logTable.find({ day: day, date: date, projectId }).value();
  const otherKey = key === "flowPoint" ? "timeSpent" : "flowPoint";

  const data = {
    day,
    date,
    projectId,
    [key]: current === undefined ? 1 : current[key] + 1,
    [otherKey]: current === undefined ? 0 : current[otherKey]
  };

  if (current === undefined) {
    logTable.push(data).write();
  } else {
    logTable
      .find({ day: day, date: date, projectId })
      .assign(data)
      .write();
  }
}

export function incrementFlowPoint(projectId: string) {
  increment("flowPoint", projectId);
}

export function incrementTimeSpent(projectId: string) {
  increment("timeSpent", projectId);
}
