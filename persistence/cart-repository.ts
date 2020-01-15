import { Cart } from '../domain/model/cart'
import { dynamoDb, TableName } from './db'
import { CartId } from '../domain/model/cart-id'

export class CartRepository {
  async findOne(cartId: CartId) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: cartId.toString(),
          sk: 'cart'
        }
      })
      .promise()

    if (result.Item) return Cart.create(result.Item)
  }

  async add(cart: Cart) {
    const params = {
      TableName,
      Item: {
        pk: cart.id.toString(),
        sk: 'cart',
        data: {
          items: cart.items,
          date: cart.date.toString()
        }
      }
    }

    await dynamoDb.put(params).promise()
    return cart
  }

  async update(cart: Cart) {
    const params = {
      TableName,
      Key: {
        pk: cart.id.toString(),
        sk: 'cart'
      },
      UpdateExpression: 'SET #dt.#items = :items',
      ExpressionAttributeNames: {
        '#dt': 'data',
        '#items': 'items'
      },
      ExpressionAttributeValues: {
        ':items': cart.items.map(c => ({
          productId: c.productId.toString(),
          sellerId: c.sellerId.toString(),
          date: c.date.toString(),
          quantity: c.quantity
        }))
      },
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(params).promise()

    return result.Attributes
  }
}
