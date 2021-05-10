import { ICommandHandler } from './ICommandHandler';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../domain/models/Subscription';
import { CreateSubscriptionCommand } from './CreateSubscriptionCommand';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CreateSubscriptionCommandHandler implements ICommandHandler {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,
    @InjectQueue('subscription_schedules')
    private subscriptionScheduleQueue: Queue,
  ) {}

  async handle(command: CreateSubscriptionCommand): Promise<Subscription> {
    // TODO: validate due date using user's timezone
    // Auth0 has country rule, we can grab country and timezone from there.

    const subscription = await this.subscriptionRepo.save(
      new Subscription(command),
    );

    await this.subscriptionScheduleQueue.add({
      subscriptionId: subscription.id,
      due: command.due,
    });

    return subscription;
  }
}
