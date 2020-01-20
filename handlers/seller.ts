import { SellerRepository } from '../persistence/seller-repository'
import { Seller } from '../domain/model/seller'
import { SellerId } from '../domain/model/seller-id'
import { renderJSON } from './concerns/render-json'
import { SellerView } from './views/seller-view'
import { SellersView } from './views/sellers-view'

const repo = new SellerRepository()

export async function index(event: any) {
  const sellers = await repo.findAll()

  return renderJSON(new SellersView(sellers))
}

export async function create(event: any) {
  const data = JSON.parse(event.body)
  const seller = new Seller(SellerId.create(), data.name)

  await repo.add(seller)
  return {
    statusCode: 200,
    body: JSON.stringify(seller)
  }
}

export async function view(event: any) {
  const { sellerId } = event.pathParameters
  const seller = await repo.findOne(new SellerId(sellerId))

  return renderJSON(new SellerView(seller))
}

export async function update(event: any) {
  const { sellerId } = event.pathParameters
  const data = JSON.parse(event.body)
  const seller = await repo.findOne(new SellerId(sellerId))
  seller.name = data.name
  await repo.update(seller)

  return renderJSON(new SellerView(seller))
}

export async function remove(event: any) {
  const { sellerId } = event.pathParameters
  await repo.delete(new SellerId(sellerId))

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}
