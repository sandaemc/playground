import { PatientViewModel } from "./patient_view_model";
import { Patient } from "../../../domain";

export class PatientsViewModel {
    constructor(private readonly models: Patient[]) {}

    public getPatients() {
        return this.models.map(e => new PatientViewModel(e));
    }
}
