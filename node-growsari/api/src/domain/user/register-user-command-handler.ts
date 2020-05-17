import { RegisterUserCommand } from "./register-user-command";
import { User } from "./user";
import { UserRepository } from "./user-repository";

export class RegisterUserCommandHandler {
  constructor(public repo: UserRepository) {}

  async execute(cmd: RegisterUserCommand) {
    const user = User.create(cmd.name, cmd.email);
    user.setPassword(cmd.password);

    await this.repo.add(user);

    return user;
  }
}
