import AWS from 'aws-sdk'
import uuid from 'uuid'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export async function index(event: any) {
  const result = await dynamoDb
    .scan({
      TableName,
      FilterExpression: 'sk = :sk',
      ExpressionAttributeValues: {
        ':sk': 'seller'
      }
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  }
}

export async function create(event: any) {
  const params = {
    TableName,
    Item: {
      pk: `seller_${uuid.v4()}`,
      sk: 'seller',
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
