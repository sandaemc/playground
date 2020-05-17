
export class Gender {
    constructor(public readonly value: string) { 
        if (!['m', 'f'].includes(value)) {
            throw new Error('Invalid gender');
        }
    }
}
