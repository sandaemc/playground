import { ProductId } from './product-id'
import { SellerId } from './seller-id'

export class CartItem {
  constructor(
    public productId: ProductId,
    public sellerId: SellerId,
    public quantity: number,
    public date: Date
  ) {}

  static create(row) {
    return new CartItem(
      new ProductId(row.productId),
      new SellerId(row.sellerId),
      parseInt(row.quantity),
      new Date(row.date)
    )
  }
}
