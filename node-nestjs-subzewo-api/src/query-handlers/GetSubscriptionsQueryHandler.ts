import { IQueryHandler } from './IQueryHandler';
import { GetSubscriptionsQuery } from './GetSubscriptionsQuery';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from '../domain/models/Subscription';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetSubscriptionsQueryHandler implements IQueryHandler {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  handle(query: GetSubscriptionsQuery) {
    return this.subscriptionRepository.find();
  }
}
