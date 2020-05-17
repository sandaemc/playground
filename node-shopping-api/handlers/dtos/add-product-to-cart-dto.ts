import { ProductId } from '../../domain/model/product-id'
import { SellerId } from '../../domain/model/seller-id'
import { CartId } from '../../domain/model/cart-id'

export class AddProductToCartDTO {
  constructor(
    public cartId: CartId,
    public productId: ProductId,
    public sellerId: SellerId,
    public quantity: number
  ) {}

  static create(parseData: any, cartId: string) {
    const { productId, sellerId, quantity } = parseData
    if (!cartId) {
      throw new Error('Cart ID is missing ')
    }

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

    return new AddProductToCartDTO(
      new CartId(cartId),
      new ProductId(productId),
      new SellerId(sellerId),
      parseInt(quantity)
    )
  }
}
