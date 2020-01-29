import { User } from "./user";

type presentable = Omit<User, "passwordHash" | "passwordSalt" | "setPassword">;

export class UserPresenter {
  static present(user: User): presentable {
    const exclude = ["passwordHash", "passwordSalt"];

    const newUser = {};
    for (const key in user) {
      if (exclude.includes(key)) continue;
      newUser[key] = user[key];
    }

    return newUser;
  }
}
