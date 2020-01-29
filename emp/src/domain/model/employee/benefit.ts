import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Money } from '../common/money';
import { Employee } from './employee';

@Entity({ name: 'benefits' })
export class Benefit {

    @PrimaryGeneratedColumn()
    protected id: number;

    @ManyToOne(type => Employee, employee => employee.benefits)
    @JoinColumn({
        name: 'employee_id'
    })
    employee: Employee;

    @Column({ name: 'name' })
    protected name: string;

    @Column({ 
        type: 'numeric', 
        default: 0, 
        transformer: {
            from: (value: number): Money => new Money(value),
            to: (value: Money): number => value.value
        }
    }) 
    amount: Money;
}