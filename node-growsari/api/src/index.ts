require("dotenv").config();
import * as restify from "restify";
import { Request } from "restify";
import { RegisterUserCommandHandler } from "./domain/user/register-user-command-handler";
import { RegisterUserCommand } from "./domain/user/register-user-command";
import { UserPresenter } from "./domain/user/user-presenter";
import { RegisterUserDTO } from "./domain/user/register-user-dto";
import { UserRepository } from "./domain/user/user-repository";
import { CreateTopicDTO } from "./domain/topic/create-topic-dto";
import { CreateTopicCommandHandler } from "./domain/topic/create-topic-command-handler";
import { TopicRepository } from "./domain/topic/topic-repository";
import { CreateTopicCommand } from "./domain/topic/create-topic-command";
const server = restify.createServer();

server.use(restify.plugins.bodyParser());

interface UserRegistrationRequest extends Request {
  body: RegisterUserDTO;
}
server.post(
  "/user/register",
  async ({ body }: UserRegistrationRequest, res) => {
    const handler = new RegisterUserCommandHandler(new UserRepository());
    const user = await handler.execute(
      new RegisterUserCommand(body.email, body.name, body.password)
    );

    res.json(UserPresenter.present(user));
  }
);

interface CreateTopicRequest extends Request {
  body: CreateTopicDTO;
}
server.post("/topic", async ({ body }: CreateTopicRequest, res) => {
  const userRepo = new UserRepository();
  const handler = new CreateTopicCommandHandler(
    new TopicRepository(),
    userRepo
  );

  const result = await handler.execute(
    new CreateTopicCommand("1", body.subject, body.description)
  );

  if (!result.failed) {
    return res.json(result.getValue());
  } else {
    return res.send(500, result.errorMessage);
  }
});

server.get("/", (req, res, next) => {
  res.send("OK");
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Listening on port: " + PORT));
