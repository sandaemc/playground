import { ViewInterface } from './view-inteface'
import { Seller } from '../../domain/model/seller'
import { SellerView } from './seller-view'

export class SellersView implements ViewInterface {
  constructor(public sellers: Seller[]) {}

  render() {
    return this.sellers.map(c => new SellerView(c)).map(v => v.render())
  }
}
