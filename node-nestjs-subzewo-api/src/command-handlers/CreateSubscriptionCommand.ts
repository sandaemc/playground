import { ICommand } from './ICommand';

export class CreateSubscriptionCommand implements ICommand {
  constructor(public name: string, public amount: number, public due: Date) {}
}
