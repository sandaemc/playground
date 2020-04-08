
export class HiringStatus {
    constructor(public readonly value: string) { 
        if (!['company', 'local'].includes(value)) {
            throw new Error("Invalid hiring status!");
        }
    }
}