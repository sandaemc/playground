import { SellerRepository } from '../persistence/seller-repository'
import { ProductRepository } from '../persistence/product-repository'
import { Product } from '../domain/model/product'
import uuid from 'uuid'

const sellerRepo = new SellerRepository()
const productRepo = new ProductRepository()

export async function index(event: any) {
  const { sellerId } = event.pathParameters
  const products = await sellerRepo.findAllProductsBy(sellerId)

  return {
    statusCode: 200,
    body: JSON.stringify(products)
  }
}

export async function create(event: any) {
  const { sellerId } = event.pathParameters
  const data = JSON.parse(event.body)
  const product = new Product(uuid.v4(), sellerId, data.name, data.description)

  await productRepo.add(product)

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
}

export async function view(event: any) {
  const { productId, sellerId } = event.pathParameters
  const product = await productRepo.findOne(sellerId, productId)

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
}

export async function update(event: any) {
  const { productId, sellerId } = event.pathParameters
  const product = await productRepo.findOne(sellerId, productId)

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Product not found' })
    }
  }

  const data = JSON.parse(event.body)
  product.name = data.name
  product.description = data.description

  await productRepo.update(product)

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
}

export async function remove(event: any) {
  const { productId, sellerId } = event.pathParameters
  await productRepo.delete(sellerId, productId)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}
