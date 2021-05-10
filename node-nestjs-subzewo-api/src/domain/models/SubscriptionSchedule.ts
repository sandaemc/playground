import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IResponsable } from '../IResponsable';
import { Subscription } from './Subscription';

@Entity({ name: 'subscription_schedules' })
export class SubscriptionSchedule implements IResponsable {
  @PrimaryGeneratedColumn({ name: 'subscription_schedule_id ' })
  private _id: number;

  @Column({ name: 'amount', type: 'decimal' })
  private _amount: number;

  @Column({ name: 'due', type: 'date' })
  private _due: Date;

  @Column({ name: 'completed', type: 'boolean', default: false })
  private _completed: boolean;

  @ManyToOne(() => Subscription, (subscription) => subscription._schedules)
  @JoinColumn({
    name: 'subscription_id',
  })
  _subscription: Subscription;

  constructor(partial: Partial<SubscriptionSchedule>) {
    Object.assign(this, partial);
  }

  public get id() {
    return this._id;
  }

  public get amount() {
    return this._amount;
  }

  public set amount(value: number) {
    this._amount = value;
  }

  public get completed() {
    return this._completed;
  }

  public set completed(value: boolean) {
    this._completed = value;
  }

  public get due() {
    return this._due;
  }

  public set due(value: Date) {
    this._due = value;
  }

  public set subscription(value: Subscription) {
    this._subscription = value;
  }

  public get subscription() {
    return this._subscription;
  }

  toJSON() {
    return {
      id: this.id,
      subscription_id: this.subscription.id,
      amount: this.amount,
      completed: this.completed,
    };
  }
}
