import db from "./db";

const configTable = db.get("configs");

export function get(name: string): number {
  const { value, type } = configTable.find({ name }).value();

  switch (type) {
    case "float":
      return parseFloat(value);
    default:
      throw new Error("Unknown type!");
  }
}

export function set(name: string, value: any) {
  configTable
    .find({ name })
    .assign({ value })
    .value();
}
