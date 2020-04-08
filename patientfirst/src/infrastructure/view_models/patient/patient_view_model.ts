import { Patient } from "../../../domain";

export class PatientViewModel {
    constructor(private readonly model: Patient) { }

    getId() {
        return this.model.getId();
    }

    getName() {
        const { lastName, firstName, middleName } = this.model.getName();
        return `${lastName}, ${firstName} ${middleName}`;
    }

    getAddress() {
        return this.model.getAddress();
    }

    getPhoneNumber() {
        return this.model.getPhoneNumber();
    }

    getGender() {
        return this.model.getGender().value;
    }
}
