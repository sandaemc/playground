import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { AbstractAggregateRoot } from '../../common';
import { Name } from './name';
import { EmploymentStatus } from './employment_status';
import { HiringStatus } from './hiring_status';
import { Position } from './position';
import { Money } from '../common/money';
import { Benefit } from './benefit';
import { Account } from './account';

@Entity({ name: 'employees' })
@Index(['lastName', 'firstName', 'middleName'], { unique: true })
export class Employee extends AbstractAggregateRoot {

    @PrimaryGeneratedColumn()
    protected id: number;

    @Column({ name: 'last_name' })
    protected lastName: string;

    @Column({ name: 'first_name' })
    protected firstName: string;

    @Column({ name: 'middle_name', nullable: true })
    protected middleName: string;

    @Column({ nullable: true })
    protected nickname: string;

    @Column({ name: 'birth_date', nullable: true })
    protected birthDate: Date;

    @Column({ 
        type: 'varchar',
        name: 'employment_status',
        transformer: {
            from: (value: string): EmploymentStatus => new EmploymentStatus(value),
            to: (value: EmploymentStatus): string => value.value 
        }
    })
    protected employmentStatus: EmploymentStatus;

    @Column({ 
        type: 'varchar',
        name: 'hiring_status',
        transformer: {
            from: (value: string): HiringStatus => new HiringStatus(value),
            to: (value: HiringStatus): string => value.value 
        }
    })
    protected hiringStatus: HiringStatus;

    @Column({ 
        type: 'varchar',
        transformer: {
            from: (value: string): Position => new Position(value),
            to: (value: Position): string => value.value
        }
    })
    protected position: Position;

    @OneToMany(type => Benefit, benefit => benefit.employee)
    benefits: Benefit[];

    @OneToMany(type => Account, account => account.employee)
    accounts: Account[];

    @Column({ 
        type: 'numeric', 
        default: 0, 
        transformer: {
            from: (value: number): Money => new Money(value),
            to: (value: Money): number => value.value
        }
    }) 
    baseRate: Money;

    @Column({ 
        type: 'numeric', 
        default: 0, 
        transformer: {
            from: (value: number): Money => new Money(value),
            to: (value: Money): number => value.value
        }
    }) 
    repaymentRate: Money;

    static create(name: Name, nickname: string, birthDate: Date, employmentStatus: EmploymentStatus, hiringStatus: HiringStatus, position: Position, baseRate: Money) {
        const employee = new Employee()
        employee.firstName = name.firstName;
        employee.lastName = name.lastName
        employee.middleName = name.middleName
        employee.nickname = nickname;
        employee.birthDate = birthDate;
        employee.employmentStatus = employmentStatus;
        employee.hiringStatus = hiringStatus;
        employee.position = position;
        employee.baseRate = baseRate;

        employee.accounts.push(Account.createLoanAccount());

        return employee;
    }

    getId() {
        return this.id;
    }

    getName() {
        return new Name(this.lastName, this.firstName, this.middleName);
    }

    getNickname() {
        return this.nickname;
    }

    getBirthDate() {
        return this.birthDate;
    }

    getEmploymentStatus() {
        return this.employmentStatus;
    }

    getHiringStatus() {
        return this.hiringStatus;
    }

    getPosition() {
        return this.position;
    }

    getBaseRate() {
        return this.baseRate;
    }

    getRepaymentRate() {
        return this.repaymentRate;
    }

    setPosition(param: Position) {
        this.position = param;
    }

    setEmploymentStatus(param: EmploymentStatus) {
        this.employmentStatus = param;
    }

    setHiringStatus(param: HiringStatus) {
        this.hiringStatus = param;
    }

    setName(param: Name) {
        this.lastName = param.lastName;
        this.firstName = param.firstName,
        this.middleName = param.middleName;
    }

    setBaseRate(param: Money) {
        this.baseRate = param;
    }

    setRepaymentRate(param: Money) {
        this.repaymentRate = param;
    }

    setNickName(param: string) {
        this.nickname = param;
    }

    addBenefit(param: Benefit) {
        this.benefits.push(param);
    }

    setBirthDate(param: Date) {
        this.birthDate = this.birthDate;
    }

    getLoanAccount() {
        const loanAccount = this.accounts.find((c: Account) => c.isLoanAccount());

        if (loanAccount === undefined) {
            throw new Error("No loan account setup for this employee! Something is wrong...");
        }

        return loanAccount;
    }
}