import db from './db';

const TABLE_NAME = 'configs';

export function get(name: string): number {
    const {value, type} = db.get(TABLE_NAME).find({name}).value();

    switch (type) {
        case 'float':
            return parseFloat(value);
        default:
            throw new Error("Unknown type!");
    }
}

export function set(name: string, value: any) {
    db.get(TABLE_NAME).find({ name }).assign({ value }).write();
}