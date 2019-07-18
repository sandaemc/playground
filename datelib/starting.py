from dateutil.relativedelta import relativedelta, FR, SU, MO, TU, TH
from datetime import *
import re
from .util import clean_split
from .but import has_but

TIME_FORMATS = {
    "\d+[aAPp][mM]": "%I%p",
    "\d+ [aApp][mM]": "%I %p",
    "\d+:\d{2}[aAPp[mM]": "%I:%M%p",
    "\d+:\d{2} [aAPp[mM]": "%I:%M %p",
}

DELTAS = {
    "tomorrow": relativedelta(days=+1),
    "next week": relativedelta(weeks=+1),
    "next month": relativedelta(months=+1),
    "next year": relativedelta(years=+1),
}


def has_time(query):
    return len(clean_split("at", query)) == 2


def has_starting(query):
    return len(clean_split("starting", query)) == 2


def get_starting(query):
    [_, starting_statement] = clean_split("starting", query)

    if has_but(starting_statement):
        [starting_statement, _] = clean_split("but", starting_statement)

    return starting_statement


def get_when_date(query):
    return get_date(query)


def get_date(query):
    [day, time] = [query, None] if not has_time(query) else clean_split("at", query)

    current_day = datetime.now()

    if day in DELTAS.keys():
        current_day += DELTAS[day]

    if time:
        for time_format in TIME_FORMATS.keys():
            if re.match(time_format, time):
                time = datetime.strptime(time, TIME_FORMATS[time_format])
                time = datetime.strftime(time, "%H:%M")
                [hour, minutes] = clean_split(":", time)

                current_day += relativedelta(
                    hour=int(hour), minute=int(minutes), second=0
                )

    return current_day


# every day starting tomorrow but monday
# every day starting tomorrow
# every day starting 2019-01-01 but monday
# every day starting today at 9PM
# every 2 weeks starting today at 2PM but monday
# every monday
# every 3 monday
# every mon,fri starting tomorrow at 9PM
def get_starting_date(query):
    if not has_starting(query):
        return datetime.now()

    return get_date(get_starting(query))