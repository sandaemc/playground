import { DomainEventInterface } from './domain_event_interface';
import { AbstractEntity } from './abstract_entity';

export abstract class AbstractAggregateRoot extends AbstractEntity {
    private events: DomainEventInterface[] = [];

    protected registerEvent(event: DomainEventInterface) {
        this.events.push(event);
    }

    protected clearEvents() {
        this.events = [];
    }

    public getEvents() {
        return this.events;
    }
}