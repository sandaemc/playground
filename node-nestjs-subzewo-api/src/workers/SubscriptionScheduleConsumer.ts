import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionSchedule } from '../domain/models/SubscriptionSchedule';
import { Repository } from 'typeorm';
import { Subscription } from '../domain/models/Subscription';

@Processor('subscription_schedules')
export class SubscriptionScheduleConsumer {
  constructor(
    @InjectRepository(SubscriptionSchedule)
    private scheduleRepo: Repository<SubscriptionSchedule>,
    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,
  ) {}
  @Process()
  async createSeries(job: Job) {
    const { subscriptionId, due } = job.data;

    try {
      const subscription = await this.subscriptionRepo.findOne(subscriptionId, {
        relations: ['_schedules'],
      });

      if (subscription == undefined) {
        throw new Error('Subscription not found');
      }

      await this.scheduleRepo.save(
        new SubscriptionSchedule({
          subscription: subscription,
          amount: subscription.amount,
          due,
        }),
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log('Done!');
  }

  @OnQueueError()
  onError(job: Job) {
    console.error('Got a nerro');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
