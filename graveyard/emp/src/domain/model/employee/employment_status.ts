
export class EmploymentStatus {
    constructor(public readonly value: string) { 
        if (!['regular', 'casual'].includes(value)) {
            throw new Error('Invalid employment status');
        }
    }
}