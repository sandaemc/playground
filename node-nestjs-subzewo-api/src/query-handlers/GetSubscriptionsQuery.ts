import { IQuery } from './IQuery';

export class GetSubscriptionsQuery implements IQuery {
  constructor(public userId: string) {}
}
