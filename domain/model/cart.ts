import { CartItem } from './cart-item'
import { Product } from './product'
import { CartId } from './cart-id'

export class Cart {
  constructor(public id: CartId, public items: CartItem[], public date: Date) {}

  static create(row: any) {
    return new Cart(
      new CartId(row.pk),
      row.data.items.map(c => CartItem.create(c)),
      new Date(row.data.date)
    )
  }

  addItem(product: Product, quantity: number) {
    console.log(product)
    console.log(this.items)
    const prodIndex = this.items.findIndex(
      c => c.productId.toString() === product.id.toString()
    )
    if (prodIndex !== -1) {
      this.items[prodIndex].quantity += quantity
    } else {
      this.items.push(
        CartItem.create({
          productId: product.id.toString(),
          sellerId: product.sellerId.toString(),
          quantity: quantity,
          date: new Date()
        })
      )
    }
  }
}
