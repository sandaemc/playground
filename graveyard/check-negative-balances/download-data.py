#!/usr/bin/env python

import os
import subprocess
from urllib.parse import urlparse
import datetime


def cp(source, dest):
    proc = subprocess.Popen(['gsutil', 'cp', source, dest])

    o, e = proc.communicate()


def ls(path):
    proc = subprocess.Popen(
            ['gsutil', 'ls', path],
            stdout=subprocess.PIPE)

    o, e = proc.communicate()
    
    return o.decode('ascii').splitlines()


def get_date_part(uri):
    return urlparse(uri).path.split("/")[2]


def get_machine_part(uri):
    return urlparse(uri).path.split("/")[1]


def is_date(value):
    try:
        datetime.datetime.strptime(value, '%Y-%m-%d')
        return True
    except ValueError:
        return False


def download():
    machines = ls('gs://btm-logs')
    for machine in machines:
        print("=> {}".format(machine)) 

        dates = list(filter(lambda x: is_date(get_date_part(x)), ls(machine)))

        # latest only
        dates.sort(reverse=True)
        dates = dates[0:1]

        for date in dates:
            print(" => {}".format(date))

            machine_name = get_machine_part(date)
            date_part = get_date_part(date)

            cp(f'{date}bitaccessv2', f'{machine_name}_{date_part}_bitaccessv2')


download()
