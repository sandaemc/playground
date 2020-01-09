import { SellerRepository } from '../persistence/seller-repository'
import { Product } from '../domain/model/product'
import uuid from 'uuid'

const repo = new SellerRepository()

export async function index(event: any) {
  const { sellerId } = event.pathParameters
  const products = await repo.findAllProductsBy(sellerId)

  return {
    statusCode: 200,
    body: JSON.stringify(products)
  }
}

export async function create(event: any) {
  const { sellerId } = event.pathParameters
  const data = JSON.parse(event.body)
  const product = new Product(uuid.v4(), data.name, data.description)

  await repo.addProductTo(product, sellerId)

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
}
