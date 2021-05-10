import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/SubscriptionController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Subscription } from './domain/models/Subscription';
import { GetSubscriptionQueryHandler } from './query-handlers/GetSubscriptionQueryHandler';
import { GetSubscriptionsQueryHandler } from './query-handlers/GetSubscriptionsQueryHandler';
import { CreateSubscriptionCommandHandler } from './command-handlers/CreateSubscriptionCommandHandler';
import { UpdateSubscriptionCommandHandler } from './command-handlers/UpdateSubscriptionCommandHandler';
import { SubscriptionScheduleConsumer } from './workers/SubscriptionScheduleConsumer';
import { SubscriptionSchedule } from './domain/models/SubscriptionSchedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'appdev',
      password: 'iamApp_dev2021',
      database: 'appdb',
      entities: [Subscription, SubscriptionSchedule],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Subscription, SubscriptionSchedule]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'subscription_schedules',
    }),
  ],
  controllers: [SubscriptionController],
  providers: [
    GetSubscriptionQueryHandler,
    GetSubscriptionsQueryHandler,
    CreateSubscriptionCommandHandler,
    UpdateSubscriptionCommandHandler,
    SubscriptionScheduleConsumer,
  ],
})
export class AppModule {}
