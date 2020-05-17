import db from "../../db";
import { User } from "./user";

const usersTable = db.get("users");

export class UserRepository {
  async add(user: User) {
    return await usersTable.push(user).write();
  }

  async findById(id: string): Promise<User | null> {
    const result = await usersTable.find({ id }).value();
    if (result == undefined) return null;

    return result as User;
  }

  async findByToken(token: string) {
    const result = await usersTable.find({ id: token }).value();
    if (result == undefined) {
      throw new Error("User not found!");
    }

    return result as User;
  }
}
