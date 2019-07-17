from .every import get_every_statements
from .but import get_but_statements
from .starting import get_starting_date, get_when_date
from dateutil import rrule


def get_when(query):
    return get_when_date(query).isoformat()


def get_repeat(query):
    queries = ["COUNT=31", "WKST=MO"]

    queries += get_but_statements(query)
    queries += get_every_statements(query)

    print([queries, get_starting_date(query).isoformat()])

    resultset = rrule.rrulestr(";".join(queries), dtstart=get_starting_date(query))
    return map(lambda x: x.isoformat(), resultset)

