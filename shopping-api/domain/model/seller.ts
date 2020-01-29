import { SellerId } from './seller-id'

export class Seller {
  constructor(public id: SellerId, public name: string) {}

  static create(row: any) {
    return new Seller(new SellerId(row.pk), row.data.name)
  }
}
