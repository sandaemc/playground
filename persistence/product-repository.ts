import AWS from 'aws-sdk'
import { Product } from '../domain/model/product'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export class ProductRepository {
  async findOne(sellerId: string, productId: string) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: `product_${productId}`,
          sk: `product_by_${sellerId}`
        }
      })
      .promise()

    if (result.Item) {
      const data = result.Item.data
      return new Product(data.id, data.sellerId, data.name, data.description)
    }
  }

  async add(product: Product) {
    const params = {
      TableName,
      Item: {
        pk: `product_${product.id}`,
        sk: `product_by_${product.sellerId}`,
        data: product
      }
    }

    await dynamoDb.put(params).promise()
    return product
  }

  async update(product: Product) {
    const params = {
      TableName,
      Key: {
        pk: `product_${product.id}`,
        sk: `product_by_${product.sellerId}`
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

    const result = await dynamoDb.update(params).promise()

    return result.Attributes
  }

  async delete(sellerId: string, productId: string) {
    await dynamoDb
      .delete({
        TableName,
        Key: {
          pk: `product_${productId}`,
          sk: `product_by_${sellerId}`
        }
      })
      .promise()

    return null
  }
}
