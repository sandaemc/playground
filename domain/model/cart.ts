import { CartItem } from './cart-item'
import { Product } from './product'

export class Cart {
  constructor(public id: string, public items: CartItem[], public date: Date) {}

  addItem(product: Product, quantity: number) {
    const prodIndex = this.items.findIndex(c => c.productId === product.id)
    if (prodIndex !== -1) {
      this.items[prodIndex].quantity += quantity
    } else {
      this.items.push({
        productId: product.id,
        quantity: quantity,
        date: new Date()
      })
    }
  }
}
