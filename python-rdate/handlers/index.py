import json


def index(event, context):
    response = {"statusCode": 200, "body": json.dumps({"name": "Date REST API v1.0"})}

    return response
