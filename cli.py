"""Script to create recurring TODOS"""
import sys
import click
from todo import add_task


@click.command()
@click.option('-p', '--project', required=True, help='Set task project')
@click.option('-l', '--label', multiple=True, help='Add task label')
@click.option('-d', '--due', help="Set task due date")
@click.argument('name')
def main(name, project, label, due):
    add_task(name, project, label, due)


if __name__ == '__main__':
    sys.exit(main())

"""I distrust the system when I am overwhelmed. I need to prevent that."""
