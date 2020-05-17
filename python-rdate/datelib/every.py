import re

FREQUENCIES = {"day": "DAILY", "week": "WEEKLY", "month": "MONTHLY", "year": "YEARLY"}


def get_every_statements(query):
    return _get_specifications(query)

def _get_specifications(query):
    matches = re.match("every (day|week|month|year)", query)
    if matches:
        return ["FREQ=" + FREQUENCIES[matches.group(1)]]

    matches = re.match("every (\d+) (day|week|month|year)", query)
    if matches:
        return ["FREQ=" + FREQUENCIES[matches.group(2)], "INTERVAL=" + matches.group(1)]

   #TODO: Fix every su,mon 
    matches = re.match("every (su|mo|tu|we|th|fr|sa)*", query)
    if matches:
        return ["FREQ=WEEKLY", "BYWEEKDAY=" + matches.group(1)]