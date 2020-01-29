import { Product } from '../../domain/model/product'
import { ViewInterface } from './view-inteface'
import { ProductView } from './product-view'

export class ProductsView implements ViewInterface {
  constructor(public products: Product[]) {}

  render() {
    return this.products.map(c => new ProductView(c)).map(v => v.render())
  }
}
