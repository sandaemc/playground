# Progressive Writing App API

## local development

`sls dynamodb install` // once only

`npm start`

```javascript
// create the tables

var params = {
  TableName: "resources-dev",
  KeySchema: [
    {
      AttributeName: "name",
      KeyType: "HASH"
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: "name",
      AttributeType: "S"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) ppJson(err);
  else ppJson(data);
});
```
