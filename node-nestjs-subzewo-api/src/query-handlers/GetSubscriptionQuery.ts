import { IQuery } from './IQuery';

export class GetSubscriptionQuery implements IQuery {
  constructor(public id: number) {}
}
