export class EmployeeDoesNotExistsException extends Error {
    constructor(m?: string) {
        super(m);

        Object.setPrototypeOf(this, EmployeeDoesNotExistsException.prototype);
    }
}