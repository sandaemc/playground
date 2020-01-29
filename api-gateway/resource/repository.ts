import { RESOURCES_TABLE, dynamoDB } from "../db";
import { Resource } from "./resource";
import * as _ from "lodash";

export function add(resource: Resource) {
  const params = {
    TableName: RESOURCES_TABLE,
    Item: {
      name: resource.name,
      host: resource.host
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDB.put(params, error => {
      if (error) {
        return reject(error);
      }

      return resolve(params.Item);
    });
  });
}

export async function findOne(name: string): Promise<Resource> {
  const params = {
    TableName: RESOURCES_TABLE,
    KeyConditionExpression: "#name = :nameValue",
    ExpressionAttributeNames: {
      "#name": "name"
    },
    ExpressionAttributeValues: {
      ":nameValue": name
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDB.query(params, (error, data) => {
      if (error) {
        return reject(error);
      }

      const result: any = _.first(data.Items);
      if (result === undefined) {
        return reject(new Error("Resource not found!"));
      }

      const { name, host } = result;

      return resolve(new Resource(name, host));
    });
  });
}

export async function update(resource: Resource) {
  const params = {
    TableName: RESOURCES_TABLE,
    Key: { name: resource.name },
    UpdateExpression: "SET #host = :hostValue",
    ExpressionAttributeNames: {
      "#host": "host"
    },
    ExpressionAttributeValues: {
      ":hostValue": resource.host
    },
    ReturnValues: "UPDATED_NEW"
  };

  return new Promise((resolve, reject) => {
    dynamoDB.update(params, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(resource);
    });
  });
}

export async function findAll() {
  console.log(RESOURCES_TABLE);
  const params = {
    TableName: RESOURCES_TABLE,
    ProjectionExpression: "#name, #host",
    ExpressionAttributeNames: {
      "#name": "name",
      "#host": "host"
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDB.scan(params, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data.Items);
    });
  });
}
