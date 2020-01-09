import AWS from 'aws-sdk'
import uuid from 'uuid'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.DYNAMODB_TABLE || ''
if (!TableName) {
  throw new Error('Please provide table name')
}

export async function index(event: any) {
  const { sellerId } = event.pathParameters.id

  const result = await dynamoDb
    .scan({
      TableName,
      FilterExpression: 'sk = :sk',
      ExpressionAttributeValues: {
        ':sk': `product_by_${sellerId}`
      }
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items)
  }
}

export async function create(event: any) {
  const { sellerId } = event.pathParameters.id

  const params = {
    TableName,
    Item: {
      pk: `product_${uuid.v4()}`,
      sk: `product_by_${sellerId}`,
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
