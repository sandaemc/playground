"""Script to create recurring TODOS"""
import sys
import os
from todoist.api import TodoistAPI
import re
from dotenv import load_dotenv
import click

"""I distrust the system when I am overwhelmed. I need to prevent that."""

load_dotenv()

api = TodoistAPI(os.getenv('TODOIST_TOKEN'))
api.sync()


def get_resource(key, source):
    result = list(filter(lambda x: re.search(key, x['name']), api.state[source]))
    if not result:
        raise Exception(f"{key} in {source} not found")

    return next(iter(result))


def get_project(key):
    return get_resource(key, 'projects')


def get_label(key):
    return get_resource(key, 'labels')


@click.command()
@click.option('-p', '--project', required=True, help='Set task project')
@click.option('-l', '--label', multiple=True, help='Add task label')
@click.option('-d', '--due', help="Set task due date")
@click.argument('name')
def main(name, project, label, due):
    """Main entry point for the script."""
    project = get_project(project)['id']
    labels = list(map(lambda x: get_label(x)['id'], label))

    api.items.add(name, project_id=project, labels=labels)
    api.commit()


if __name__ == '__main__':
    sys.exit(main())

