import db from "../../db";
import { Topic } from "./topic";
import { Result } from "../../infra/result";

const topicsTable = db.get("topics");

export class TopicRepository {
  async add(topic: Topic): Promise<Result<Topic>> {
    try {
      throw new Error("Failure");
      await topicsTable.push(topic).write();
      return Result.ok(topic);
    } catch (err) {
      return Result.fail(err.message);
    }
  }
}
