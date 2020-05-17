export class RegisterUserCommand {
  constructor(
    public email: string,
    public name: string,
    public password: string
  ) {}
}
