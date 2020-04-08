import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Check } from 'typeorm';
import { Money } from '../common/money';
import { Account } from './account';

@Entity({ name: 'transactions' })
@Check(`transaction_type IN ('induction', 'deduction')`)
export class Transaction {

    @PrimaryGeneratedColumn()
    protected id: number;

    @ManyToOne(type => Account, account => account.transactions)
    @JoinColumn({
        name: 'account_id'
    })
    account: Account;

    @Column({ name: 'transaction_type' })
    transactionType: string;

    @Column({ 
        type: 'numeric', 
        default: 0, 
        transformer: {
            from: (value: number): Money => new Money(value),
            to: (value: Money): number => value.value
        }
    }) 
    amount: Money;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    isDeduction() {
        return this.transactionType === 'deduction';
    }
}