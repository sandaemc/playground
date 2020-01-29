import { User } from "../user/user";
import * as uuid from "uuid";

export class Topic {
  private constructor(
    protected id: string,
    protected owner: User,
    protected subject: string,
    protected description: string,
    protected createdAt: Date,
    protected updatedAt: Date
  ) {}

  static create(owner: User, subject: string, description: string) {
    return new Topic(
      uuid.v1(),
      owner,
      subject,
      description,
      new Date(),
      new Date()
    );
  }
}
