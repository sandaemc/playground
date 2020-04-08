import * as numeral from 'numeral';
  
export class Money {
    private amount: Numeral;

    constructor(amount: number | string) {
        this.amount = numeral(amount);
    }

    get value() {
        return this.amount.value();
    }

    add(other: Money) {
        return new Money(this.value + other.value);
    }

    subtract(other: Money) {
        return new Money(this.value - other.value);
    }
}