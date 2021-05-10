import { IQueryHandler } from './IQueryHandler';
import { Repository } from 'typeorm';
import { Subscription } from '../domain/models/Subscription';
import { GetSubscriptionQuery } from './GetSubscriptionQuery';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetSubscriptionQueryHandler implements IQueryHandler {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  handle(query: GetSubscriptionQuery) {
    return this.subscriptionRepository.findOne(query.id, {
      relations: ['_schedules'],
    });
  }
}
