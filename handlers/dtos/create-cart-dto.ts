import { ProductId } from '../../domain/model/product-id'
import { SellerId } from '../../domain/model/seller-id'

export class CreateCartDTO {
  constructor(
    public productId: ProductId,
    public sellerId: SellerId,
    public quantity: number
  ) {}

  static create(parseData: any) {
    const { productId, sellerId, quantity } = parseData

    if (!productId) {
      throw new Error('Product ID is missing')
    }

    if (!sellerId) {
      throw new Error('Seller ID is missing')
    }

    if (!quantity) {
      throw new Error('Quantity is missing')
    }

    if (parseInt(quantity) === NaN) {
      throw new Error('Quantity is not a number')
    }

    return new CreateCartDTO(
      new ProductId(productId),
      new SellerId(sellerId),
      parseInt(quantity)
    )
  }
}
