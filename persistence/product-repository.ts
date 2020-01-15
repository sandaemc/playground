import { Product } from '../domain/model/product'
import { ProductId } from '../domain/model/product-id'
import { SellerId } from '../domain/model/seller-id'
import { dynamoDb, TableName } from './db'

export class ProductRepository {
  async findOne(sellerId: SellerId, productId: ProductId) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: productId.toString(),
          sk: sellerId.toString()
        }
      })
      .promise()

    if (result.Item) {
      return Product.create(result.Item)
    }
  }

  async update(product: Product) {
    const params = {
      TableName,
      Key: {
        pk: product.id.toString(),
        sk: product.sellerId.toString()
      },
      UpdateExpression:
        'SET #dt.#name = :name, #dt.#description = :description',
      ExpressionAttributeNames: {
        '#dt': 'data',
        '#name': 'name',
        '#description': 'description'
      },
      ExpressionAttributeValues: {
        ':name': product.name,
        ':description': product.description
      },
      ReturnValues: 'UPDATED_NEW'
    }

    await dynamoDb.update(params).promise()

    return product
  }

  async delete(sellerId: string, productId: string) {
    await dynamoDb
      .delete({
        TableName,
        Key: {
          pk: productId.toString(),
          sk: sellerId.toString()
        }
      })
      .promise()
  }
}
