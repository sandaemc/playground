import { ICommandHandler } from './ICommandHandler';
import { UpdateSubscriptionCommand } from './UpdateSubscriptionCommand';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from '../domain/models/Subscription';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UpdateSubscriptionCommandHandler implements ICommandHandler {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,
    @InjectQueue('subscription_schedules')
    private subscriptionScheduleQueue: Queue,
  ) {}

  // TODO: validate due date using user's timezone
  async handle(command: UpdateSubscriptionCommand): Promise<Subscription> {
    const subscription = await this.subscriptionRepo.findOne(
      command.sourceSubscriptionId,
    );

    if (subscription == undefined) {
      throw new NotFoundException();
    }

    if (command.name != undefined) {
      subscription.name = command.name;
    }

    if (command.amount != undefined) {
      subscription.amount = command.amount;
    }

    await this.subscriptionScheduleQueue.add({
      subscriptionId: subscription.id,
      due: command.due,
    });

    return this.subscriptionRepo.save(subscription);
  }
}
