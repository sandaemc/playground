import { SellerRepository } from '../persistence/seller-repository'
import { Seller } from '../domain/model/seller'

const repo = new SellerRepository()

export async function index(event: any) {
  const sellers = await repo.findAll()

  return {
    statusCode: 200,
    body: JSON.stringify(sellers)
  }
}

export async function create(event: any) {
  const data = JSON.parse(event.body)
  const seller = new Seller(data.name)

  await repo.add(seller)
  return {
    statusCode: 200,
    body: JSON.stringify(seller)
  }
}
