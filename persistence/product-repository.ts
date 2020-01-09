import AWS from 'aws-sdk'
import { Seller } from '../domain/model/seller'
import { Product } from '../domain/model/product'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export class ProductRepository {
  async findOne(productId: string) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: `product_${productId}`
        }
      })
      .promise()

    return new Seller(result.Item?.data.id, result.Item?.data.name)
  }

  async add(seller: Seller) {
    const params = {
      TableName,
      Item: {
        pk: `seller_${seller.getId()}`,
        sk: 'seller',
        data: seller
      }
    }

    await dynamoDb.put(params).promise()
    return seller
  }

  async addProductTo(product: Product, seller: Seller) {
    const params = {
      TableName,
      Item: {
        pk: `product_${product.getId()}`,
        sk: `product_by_${seller.getId()}`,
        data: product
      }
    }

    await dynamoDb.put(params).promise()
    return product
  }
}
