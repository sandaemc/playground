import os
from todoist.api import TodoistAPI
import re
from dotenv import load_dotenv

load_dotenv()

api = TodoistAPI(os.getenv('TODOIST_TOKEN'))
#api.sync()


def get_resource(key, source):
    result = list(filter(lambda x: re.search(key, x['name']), api.state[source]))
    if not result:
        raise Exception(f"{key} in {source} not found")

    return next(iter(result))


def _get_project(key):
    return get_resource(key, 'projects')


def _get_label(key):
    return get_resource(key, 'labels')


def add_task(name, project, labels, due=None):
    """Main entry point for the script."""
    project = _get_project(project)['id']
    labels = list(map(lambda x: _get_label(x)['id'], labels))

    api.items.add(name, project_id=project, labels=labels, date_string=due)

    api.commit(raise_on_error=False)

