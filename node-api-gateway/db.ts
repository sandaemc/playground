import * as AWS from "aws-sdk";

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "ap-southeast-1",
    endpoint: "http://localhost:8000"
  };
}

export const RESOURCES_TABLE: string =
  process.env.RESOURCES_TABLE || "resources-dev";

export const dynamoDB = new AWS.DynamoDB.DocumentClient(options);
