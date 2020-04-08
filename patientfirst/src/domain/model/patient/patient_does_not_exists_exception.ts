export class PatientDoesNotExistsException extends Error {
    constructor(m?: string) {
        super(m);

        Object.setPrototypeOf(this, PatientDoesNotExistsException.prototype);
    }
}
