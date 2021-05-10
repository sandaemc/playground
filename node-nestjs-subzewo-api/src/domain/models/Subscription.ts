import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IResponsable } from '../IResponsable';
import { SubscriptionSchedule } from './SubscriptionSchedule';

@Entity({ name: 'subscriptions' })
export class Subscription implements IResponsable {
  @PrimaryGeneratedColumn({ name: 'subscription_id ' })
  _id: number;

  @Column({ name: 'name' })
  _name: string;

  @Column({ name: 'amount', type: 'decimal' })
  _amount: number;

  @OneToMany(() => SubscriptionSchedule, (schedule) => schedule._subscription)
  _schedules: SubscriptionSchedule[];

  constructor(partial: Partial<Subscription>) {
    Object.assign(this, partial);
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get amount() {
    return this._amount;
  }

  public set amount(value: number) {
    this._amount = value;
  }

  public set schedules(value: SubscriptionSchedule[]) {
    this._schedules = value;
  }

  public get schedules() {
    return this._schedules;
  }

  addSchedule(schedule: SubscriptionSchedule) {
    this._schedules.push(schedule);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      schedules: this.schedules,
    };
  }
}
