import re


def clean_split(splitter, query):
    return list(map(lambda x: x.strip(), re.split(splitter, query)))
