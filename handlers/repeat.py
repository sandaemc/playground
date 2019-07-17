import json
from datelib import translate

# TODO: Expand every friday?
def repeat(event, context):
    query = event["queryStringParameters"]["query"]

    response = {
        "statusCode": 200,
        "body": json.dumps(list(translate.get_repeat(query))),
    }

    return response
