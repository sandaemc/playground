# api

## Requirements

 - PostgreSQL
 - [PostgREST](https://github.com/PostgREST/postgrest)

## Setting Up

 - Add these variables to your `.bashrc`:

```
export PGPASSWORD=ERTyui234
export PGUSER=postgres
export PATH=$PATH:/path/to/postgrest-executable
```

## Running

```
// first time only
dropdb patientfirstdb
createdb patientfirstdb
psql -d patientfirstdb -f schema.sql

// run the API
postgrest.exe app.conf

// testing the API (use Insomnia)
```
