import { ICommand } from './ICommand';

export class UpdateSubscriptionCommand implements ICommand {
  constructor(
    public sourceSubscriptionId: number,
    public name?: string,
    public amount?: number,
    public due?: Date,
  ) {}
}
