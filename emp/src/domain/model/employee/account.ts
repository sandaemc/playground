import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Employee } from './employee';
import { Transaction } from './transaction';
import { Money } from '../common/money';

@Entity({ name: 'accounts' })
export class Account {

    static TYPE_LOAN_ACCOUNT = 'LoanAccount';

    @PrimaryGeneratedColumn()
    protected id: number;

    @ManyToOne(type => Employee, employee => employee.accounts)
    @JoinColumn({
        name: 'employee_id'
    })
    employee: Employee;

    @OneToMany(type => Transaction, transaction => transaction.account)
    transactions: Transaction[];

    @Column({ name: 'name' })
    protected name: string;

    static createLoanAccount() {
        const account = new Account();
        account.name = this.TYPE_LOAN_ACCOUNT;

        return account;
    }

    getBalance(): Money {
        const reducer = (transactions: Transaction[]) => transactions.map((c: Transaction) => c.amount).reduce((accumulator: Money, currentValue: Money) => accumulator.add(currentValue));

        const induction = reducer(this.transactions.filter((c: Transaction) => !c.isDeduction()))
        const deduction = reducer(this.transactions.filter((c: Transaction) => c.isDeduction()));

        return induction.subtract(deduction);
    }

    isLoanAccount() {
        return this.name === Account.TYPE_LOAN_ACCOUNT;
    }
}