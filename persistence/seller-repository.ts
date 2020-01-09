import AWS from 'aws-sdk'
import { Seller } from '../domain/model/seller'
import { Product } from '../domain/model/product'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export class SellerRepository {
  async findOne(sellerId: string) {
    const result = await dynamoDb
      .get({
        TableName,
        Key: {
          pk: `seller_${sellerId}`
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

    console.log(result.Items)

    return result.Items?.map(c => new Seller(c.data.id, c.data.name))
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
      ({ data }) => new Product(data.id, data.name, data.description)
    )
  }

  async addProductTo(product: Product, sellerId: string) {
    const params = {
      TableName,
      Item: {
        pk: `product_${product.getId()}`,
        sk: `product_by_${sellerId}`,
        data: product
      }
    }

    await dynamoDb.put(params).promise()
    return product
  }
}
