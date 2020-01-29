import { Seller } from '../../domain/model/seller'

export class SellerView {
  constructor(public seller: Seller) {}

  render() {
    return {
      id: this.seller.id.toString(),
      name: this.seller.name
    }
  }
}
