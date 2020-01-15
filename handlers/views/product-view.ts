import { Product } from '../../domain/model/product'
import { ViewInterface } from './view-inteface'

export class ProductView implements ViewInterface {
  constructor(public product: Product) {}

  render() {
    return {
      id: this.product.id.toString(),
      sellerId: this.product.sellerId.toString(),
      name: this.product.name,
      description: this.product.description
    }
  }
}
