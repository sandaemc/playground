import AWS from 'aws-sdk'
import { Seller } from '../domain/model/seller'
import { Product } from '../domain/model/product'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export class SellerRepository {
  async findOne(cartId: string) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: `cart_${cartId}`,
          sk: 'cart'
        }
      })
      .promise()

    return new Seller(result.Item?.data.id, result.Item?.data.name)
  }

  async findAll() {
    const result = await dynamoDb
      .scan({
        TableName,
        FilterExpression: 'sk = :sk',
        ProjectionExpression: '#dt',
        ExpressionAttributeValues: {
          ':sk': 'seller'
        },
        ExpressionAttributeNames: {
          '#dt': 'data'
        }
      })
      .promise()

    return result.Items?.map(({ data }) => new Seller(data.id, data.name))
  }

  async add(seller: Seller) {
    const params = {
      TableName,
      Item: {
        pk: `seller_${seller.id}`,
        sk: 'seller',
        data: seller
      }
    }

    await dynamoDb.put(params).promise()
    return seller
  }

  async update(seller: Seller) {
    const params = {
      TableName,
      Key: {
        pk: `seller_${seller.id}`,
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

  async delete(sellerId: string) {
    await dynamoDb
      .delete({
        TableName,
        Key: {
          pk: `seller_${sellerId}`,
          sk: 'seller'
        }
      })
      .promise()

    return null
  }

  async findAllProductsBy(sellerId: string) {
    const result = await dynamoDb
      .scan({
        TableName,
        FilterExpression: 'sk = :sk',
        ExpressionAttributeValues: {
          ':sk': `product_by_${sellerId}`
        }
      })
      .promise()

    return result.Items?.map(
      ({ data }) => new Product(data.id, sellerId, data.name, data.description)
    )
  }
}
