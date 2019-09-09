"""Script to create recurring TODOS"""
import sys
import os
from todoist.api import TodoistAPI
import re
from dotenv import load_dotenv

"""I distrust the system when I am overwhelmed. I need to prevent that."""

load_dotenv()

api = TodoistAPI(os.getenv('TODOIST_TOKEN'))
api.sync()


def get_resource(key, source):
    result = list(filter(lambda x: re.search(key, x['name']), api.state[source]))
    if not result:
        raise Exception("$source not found")

    return next(iter(result))


def get_project(key):
    return get_resource(key, 'projects')


def get_label(key):
    return get_resource(key, 'labels')


def main():
    """Main entry point for the script."""
    #task1 = api.items.add('Task 1', project_id=2205201086, labels=[2153139531])

    print(get_label('ThisWeek'))


if __name__ == '__main__':
    sys.exit(main())

