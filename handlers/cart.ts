import { CartRepository } from '../persistence/cart-repository'
import { Cart } from '../domain/model/cart'
import { CartId } from '../domain/model/cart-id'
import { ProductRepository } from '../persistence/product-repository'
import { CreateCartDTO } from './dtos/create-cart-dto'

const cartRepo = new CartRepository()
const productRepo = new ProductRepository()

export async function create(event: any) {
  const cart = new Cart(CartId.create(), [], new Date())
  await cartRepo.add(cart)

  return {
    statusCode: 200,
    body: JSON.stringify(cart)
  }
}

export async function view(event: any) {
  const { cartId } = event.pathParameters
  const cart = await cartRepo.findOne(new CartId(cartId))

  return {
    statusCode: 200,
    body: JSON.stringify(cart)
  }
}

export async function addItem(event: any) {
  const { cartId } = event.pathParameters

  const cart = await cartRepo.findOne(new CartId(cartId))
  if (!cart) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Cart not found' })
    }
  }

  const dto = CreateCartDTO.create(JSON.parse(event.body))

  const product = await productRepo.findOne(dto.sellerId, dto.productId)
  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Product not found' })
    }
  }

  cart.addItem(product, dto.quantity)
  await cartRepo.update(cart)

  return {
    statusCode: 200,
    body: JSON.stringify(cart)
  }
}
