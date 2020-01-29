#!/usr/bin/env python

import os
import subprocess
import re


def csv(db):
    dbname = get_db_part(db)
    datepart = get_date_part(db)

    proc = subprocess.Popen(['litecli', db, '--csv', '-e', f"SELECT '{dbname}', '{datepart}', * FROM cash_level"], stdout=subprocess.PIPE)

    o, e = proc.communicate()

    result = o.decode('ascii').splitlines()
    return result[1:]


def ls(path):
    proc = subprocess.Popen(
            ['ls', path],
            stdout=subprocess.PIPE)

    o, e = proc.communicate()
    
    return o.decode('ascii').splitlines()


def get_date_part(path):
    return path.split("_")[1]


def get_db_part(path):
    return path.split("_")[0]


def is_db(filename):
    return re.search(r'bitaccessv2$', filename)


def generate():
    dbs = list(filter(lambda x: is_db(x), ls('.')))

    print(f'"machine","date","id","level","channel","location","timestamp"')

    for db in dbs:
        result = csv(db)
        for row in result:
            print(row)


generate()
