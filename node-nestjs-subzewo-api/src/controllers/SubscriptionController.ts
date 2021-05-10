import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Subscription } from 'src/domain/models/Subscription';
import { CreateSubscriptionRequest } from 'src/requests/CreateSubscriptionRequest';
import { UpdateSubscriptionRequest } from 'src/requests/UpdateSubscriptionRequest';
import { GetSubscriptionQueryHandler } from '../query-handlers/GetSubscriptionQueryHandler';
import { GetSubscriptionQuery } from '../query-handlers/GetSubscriptionQuery';
import { BaseController } from './BaseController';
import { GetSubscriptionsQueryHandler } from '../query-handlers/GetSubscriptionsQueryHandler';
import { GetSubscriptionsQuery } from '../query-handlers/GetSubscriptionsQuery';
import { CreateSubscriptionCommandHandler } from '../command-handlers/CreateSubscriptionCommandHandler';
import { CreateSubscriptionCommand } from '../command-handlers/CreateSubscriptionCommand';
import { UpdateSubscriptionCommandHandler } from '../command-handlers/UpdateSubscriptionCommandHandler';
import { UpdateSubscriptionCommand } from '../command-handlers/UpdateSubscriptionCommand';

@Controller('subscriptions')
export class SubscriptionController extends BaseController {
  constructor(
    private getSubscription: GetSubscriptionQueryHandler,
    private getSubscriptions: GetSubscriptionsQueryHandler,
    private createSubscription: CreateSubscriptionCommandHandler,
    private updateSubscription: UpdateSubscriptionCommandHandler,
  ) {
    super();
  }

  @Get()
  index(): Promise<Subscription[]> {
    return this.getSubscriptions.handle(new GetSubscriptionsQuery('123'));
  }

  @Post()
  create(@Body(new ValidationPipe()) dto: CreateSubscriptionRequest) {
    return this.createSubscription.handle(
      new CreateSubscriptionCommand(dto.name, dto.amount, dto.due),
    );
  }

  @Get(':id')
  view(@Param('id', ParseIntPipe) id: number) {
    return this.getSubscription.handle(new GetSubscriptionQuery(id));
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) dto: UpdateSubscriptionRequest,
  ) {
    return this.updateSubscription.handle(
      new UpdateSubscriptionCommand(id, dto.name, dto.amount, dto.due),
    );
  }
}
