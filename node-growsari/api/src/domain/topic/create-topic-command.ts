export class CreateTopicCommand {
  constructor(
    public ownerId: string,
    public subject: string,
    public description: string
  ) {}
}
