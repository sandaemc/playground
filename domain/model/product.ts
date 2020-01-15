import { SellerId } from './seller-id'
import { ProductId } from './product-id'

export class Product {
  constructor(
    public id: ProductId,
    public sellerId: SellerId,
    public name: string,
    public description: string
  ) {}

  static create(row: any) {
    return new Product(
      new ProductId(row.pk),
      new SellerId(row.sk),
      row.data.name,
      row.data.description
    )
  }
}
