import { SellerRepository } from '../persistence/seller-repository'
import { ProductRepository } from '../persistence/product-repository'
import { Product } from '../domain/model/product'
import { ProductId } from '../domain/model/product-id'
import { SellerId } from '../domain/model/seller-id'
import { ProductView } from './views/product-view'
import { renderJSON } from './concerns/render-json'
import { ProductsView } from './views/products-view'

const sellerRepo = new SellerRepository()
const productRepo = new ProductRepository()

export async function index(event: any) {
  const { sellerId } = event.pathParameters
  const products = await sellerRepo.findAllProductsBy(new SellerId(sellerId))

  return renderJSON(new ProductsView(products))
}

export async function create(event: any) {
  const { sellerId } = event.pathParameters
  const data = JSON.parse(event.body)
  const product = new Product(
    ProductId.create(),
    new SellerId(sellerId),
    data.name,
    data.description
  )

  await sellerRepo.addProduct(product)

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
}

export async function view(event: any) {
  const { productId, sellerId } = event.pathParameters
  const product = await productRepo.findOne(
    new SellerId(sellerId),
    new ProductId(productId)
  )

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Product not found' })
    }
  }

  return renderJSON(new ProductView(product))
}

export async function update(event: any) {
  const { productId, sellerId } = event.pathParameters
  const product = await productRepo.findOne(
    new SellerId(sellerId),
    new ProductId(productId)
  )

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Product not found' })
    }
  }

  const data = JSON.parse(event.body)
  product.name = data.name || product.name
  product.description = data.description || product.description

  await productRepo.update(product)

  return renderJSON(new ProductView(product))
}

export async function remove(event: any) {
  const { productId, sellerId } = event.pathParameters
  await productRepo.delete(sellerId, productId)

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}
