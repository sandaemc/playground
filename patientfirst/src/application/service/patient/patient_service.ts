import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient, Name, Gender } from '../../../domain/model';
import { ORM } from '../../../infrastructure';
import { PatientDTO } from './patient_dto';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(ORM.PatientRepository)
        private readonly patientRepository: ORM.PatientRepository
    ) {}

    findAll(): Promise<Patient[]> {
        return this.patientRepository.findAll();
    }

    findOne(id: number): Promise<Patient> {
        return this.patientRepository.ofId(id);
    }

    async create(data: PatientDTO) {
        const patient = Patient.create(
            new Name(data.lastName, data.firstName, data.middleName),
            data.birthDate,
            new Gender(data.gender),
            data.address,
            data.phoneNumber
        );

        await this.patientRepository.save(patient);
    }

    async update(id: number, data: PatientDTO) {
        const patient = await this.patientRepository.ofId(id);
        patient.setBirthDate(data.birthDate);
        patient.setName(new Name(data.lastName, data.firstName, data.middleName));
        patient.setGender(new Gender(data.gender));
        patient.setAddress(data.address);
        patient.setPhoneNumber(data.phoneNumber);

        await this.patientRepository.save(patient);
    }

    async delete(id: number) {
        await this.patientRepository.delete(id);
    }

}
