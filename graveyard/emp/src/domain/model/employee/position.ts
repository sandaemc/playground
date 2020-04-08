export class Position {
    constructor(public readonly value: string) { 
        if (!['mason', 'carpenter'].includes(value)) {
            throw new Error('Invalid position!');
        }
    }
}