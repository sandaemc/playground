import AWS from 'aws-sdk'
import uuid from 'uuid'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export async function create(event: any) {
  const params = {
    TableName,
    Item: {
      pk: `cart_${uuid.v4()}`,
      sk: `cart`,
      data: {
        hello: 'world'
      }
    }
  }

  await dynamoDb.put(params).promise()
  return {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  }
}
