import json
from datelib import translate


def when(event, context):
    query = event["queryStringParameters"]["query"]

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "type": 'date',
            "items": [translate.get_when(query)]
        }),
    }

    return response
