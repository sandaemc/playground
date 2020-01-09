import AWS from 'aws-sdk'
import { Seller } from '../domain/model/seller'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export class SellerRepository {
  async findAll() {
    const result = await dynamoDb
      .scan({
        TableName,
        FilterExpression: 'sk = :sk',
        ProjectionExpression: 'data',
        ExpressionAttributeValues: {
          ':sk': 'seller'
        }
      })
      .promise()

    return result.Items
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
    return params.Item.data
  }
}
