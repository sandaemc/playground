import { Patient } from "./patient";

export interface PatientRepositoryInterface {
    ofId(id: number): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    save(patient: Patient);
}
