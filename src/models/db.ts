import { v4 } from "uuid";
import { Project } from "./project";
import { Config } from "./config";

const lowdb = require("lowdb");
const LocalStorage = require("lowdb/adapters/LocalStorage");

const adapter = new LocalStorage("db");
const db = lowdb(adapter);

export type DatabaseSchema = {
  configs: Config[];
  logs: [];
  projects: Project[];
};

const defaults: DatabaseSchema = {
  configs: [
    {
      name: "tick.sound.volume",
      value: 0.05,
      type: "float"
    },
    {
      name: "ding.sound.volume",
      value: 0.1,
      type: "float"
    },
    {
      name: "flow.sound.volume",
      value: 0.1,
      type: "float"
    }
  ],
  logs: [],
  projects: []
};

db.defaults(defaults).write();

export default db;
