from .util import clean_split

DAYS = {"SU", "MO", "TU", "WE", "TH", "FR", "SA"}


def has_but(query):
    parts = clean_split("but", query)
    return len(parts) == 2


def get_but(query):
    [_, but_statement] = clean_split("but", query)
    return but_statement


def _get_specifications(query):
    excluded_days = clean_split(",", query)
    excluded_days = set(map(lambda x: x[:2].upper(), excluded_days))

    included_days = DAYS - excluded_days

    return ["BYWEEKDAY=" + ",".join(included_days)]


def get_but_statements(query):
    return _get_specifications(get_but(query)) if has_but(query) else []

