import { Seller } from '../domain/model/seller'
import { Product } from '../domain/model/product'
import { SellerId } from '../domain/model/seller-id'
import { dynamoDb, TableName } from './db'

export class SellerRepository {
  async findOne(sellerId: SellerId) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: sellerId.toString(),
          sk: 'seller'
        }
      })
      .promise()

    return Seller.create(result.Item)
  }

  async findAll() {
    const result = await dynamoDb
      .scan({
        TableName,
        FilterExpression: 'sk = :sk',
        ExpressionAttributeValues: {
          ':sk': 'seller'
        }
      })
      .promise()

    return result.Items?.map(c => Seller.create(c))
  }

  async add(seller: Seller) {
    const params = {
      TableName,
      Item: {
        pk: seller.id.toString(),
        sk: 'seller',
        data: {
          name: seller.name
        }
      }
    }

    await dynamoDb.put(params).promise()
    return seller
  }

  async update(seller: Seller) {
    const params = {
      TableName,
      Key: {
        pk: seller.id.toString(),
        sk: 'seller'
      },
      UpdateExpression: 'SET #dt.#name = :name',
      ExpressionAttributeNames: {
        '#dt': 'data',
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': seller.name
      },
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await dynamoDb.update(params).promise()

    return result.Attributes
  }

  async delete(sellerId: SellerId) {
    await dynamoDb
      .delete({
        TableName,
        Key: {
          pk: sellerId.toString(),
          sk: 'seller'
        }
      })
      .promise()

    return null
  }

  async addProduct(product: Product) {
    await dynamoDb
      .put({
        TableName,
        Item: {
          pk: product.id.toString(),
          sk: product.sellerId.toString(),
          data: {
            name: product.name,
            description: product.description
          }
        }
      })
      .promise()
  }

  async findAllProductsBy(sellerId: SellerId) {
    const result = await dynamoDb
      .scan({
        TableName,
        FilterExpression: 'sk = :sk',
        ExpressionAttributeValues: {
          ':sk': sellerId.toString()
        }
      })
      .promise()

    return result.Items?.map(c => Product.create(c)) || []
  }
}
