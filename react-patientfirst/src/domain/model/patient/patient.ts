import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractAggregateRoot } from '../../common';
import { Name } from './name';
import { Gender } from './gender';

@Entity({ name: 'patients' })
export class Patient extends AbstractAggregateRoot {

    @PrimaryGeneratedColumn()
    protected id: number;

    @Column({ name: 'last_name' })
    protected lastName: string;

    @Column({ name: 'first_name' })
    protected firstName: string;

    @Column({ name: 'middle_name' })
    protected middleName: string;

    @Column({ name: 'birth_date' })
    protected birthDate: Date;

    @Column()
    protected gender: string;

    @Column()
    protected address: string;

    @Column({ name: 'phone_number' })
    protected phoneNumber: string;

    static create(name: Name, birthDate: Date, gender: Gender, address: string, phoneNumber: string) {
        const patient = new Patient()
        patient.firstName = name.firstName;
        patient.lastName = name.lastName
        patient.middleName = name.middleName
        patient.birthDate = birthDate;
        patient.address = address;
        patient.gender = gender.value;
        patient.phoneNumber = phoneNumber;
        return patient;
    }

    getId() {
        return this.id;
    }

    getName() {
        return new Name(this.lastName, this.firstName, this.middleName);
    }

    getAddress() {
        return this.address;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    getBirthDate() {
        return this.birthDate;
    }

    getGender() {
        return new Gender(this.gender)
    }


    setGender(param: Gender) {
        this.gender = param.value;
    }

    setName(param: Name) {
        this.lastName = param.lastName;
        this.firstName = param.firstName,
        this.middleName = param.middleName;
    }

    setAddress(param: string) {
        this.address = param;
    }
    
    setPhoneNumber(param: string) {
        this.phoneNumber = param;
    }

    setBirthDate(param: Date) {
        this.birthDate = this.birthDate;
    }
}
