from chalice import Chalice
from todo import add_task

app = Chalice(app_name="recurrist")


@app.route('/', methods=['GET'])
def index():
    return {'app': 'Recurrist v1'}


@app.route('/', methods=['POST'])
def create_task():
    request = app.current_request
    body = request.json_body

    add_task(body['name'], body['project'], body['labels'], body.get('due', None))

    return {'done': 'ok'}

