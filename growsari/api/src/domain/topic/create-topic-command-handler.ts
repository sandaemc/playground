import { UserRepository } from "../user/user-repository";
import { CreateTopicCommand } from "./create-topic-command";
import { TopicRepository } from "./topic-repository";
import { Topic } from "./topic";
import { Result } from "../../infra/result";
import { User } from "../user/user";

export class CreateTopicCommandHandler {
  constructor(
    public topicRepo: TopicRepository,
    public userRepo: UserRepository
  ) {}

  async execute(cmd: CreateTopicCommand): Promise<Result<Topic>> {
    return await this.topicRepo.add(
      Topic.create(User.create("tempo", "rary"), cmd.subject, cmd.description)
    );
  }
}
