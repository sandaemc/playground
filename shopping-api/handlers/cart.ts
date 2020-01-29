import { CartRepository } from '../persistence/cart-repository'
import { Cart } from '../domain/model/cart'
import { CartId } from '../domain/model/cart-id'
import { AddProductToCartDTO } from './dtos/add-product-to-cart-dto'
import { AddProdutToCartCommand } from '../commands/add-product-to-cart-command'

const cartRepo = new CartRepository()

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

  try {
    const dto = AddProductToCartDTO.create(JSON.parse(event.body), cartId)
    const cmd = new AddProdutToCartCommand(dto)
    const cart = await cmd.execute()
    return {
      statusCode: 200,
      body: JSON.stringify(cart)
    }
  } catch (err) {
    // TODO: Assuming everything is 404 for now
    return {
      statusCode: 404,
      body: { message: err.message }
    }
  }
}
