import { AddProductToCartDTO } from '../handlers/dtos/add-product-to-cart-dto'
import { ProductRepository } from '../persistence/product-repository'
import { CartRepository } from '../persistence/cart-repository'

export class AddProdutToCartCommand {
  private productRepo = new ProductRepository()
  private cartRepo = new CartRepository()

  constructor(public dto: AddProductToCartDTO) {}

  async execute() {
    const cart = await this.cartRepo.findOne(this.dto.cartId)
    if (!cart) {
      throw new Error('Cart not found')
    }

    const product = await this.productRepo.findOne(
      this.dto.sellerId,
      this.dto.productId
    )
    if (!product) {
      throw new Error('Product not found')
    }

    cart.addItem(product, this.dto.quantity)
    await this.cartRepo.update(cart)

    return cart
  }
}
