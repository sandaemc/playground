import { Repository, EntityRepository } from 'typeorm';
import { Patient, PatientRepositoryInterface, PatientDoesNotExistsException } from '../../domain';

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> implements PatientRepositoryInterface {
    findAll() {
        return this.find();
    }

    async ofId(id: number): Promise<Patient> {
        const patient = await this.findOne(id);

        if (patient === undefined) {
            throw new PatientDoesNotExistsException();
        }

        return patient;
    }

}
