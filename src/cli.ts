#!/usr/bin/env node
import * as fs from "fs"
import { GoogleCalendarApi } from "./api"
import * as yargs from "yargs"
import * as _ from "lodash"
import { startOfDay, endOfDay, addDays, endOfWeek } from "date-fns"

interface CLIArguments {
  [x: string]: unknown
  credential: string
  token: string
  json?: boolean
  _: ArrayLike<string>
}

const arg: CLIArguments = yargs.options({
  credential: { type: "string", demandOption: true },
  token: { type: "string", demandOption: true },
  json: { type: "boolean" }
}).argv

const apiCredential = JSON.parse(fs.readFileSync(arg.credential).toString())
const token = JSON.parse(fs.readFileSync(arg.token).toString())

const oAuthClientInfo = {
  id: apiCredential.installed.client_id,
  secret: apiCredential.installed.client_secret,
  redirectUri: apiCredential.installed.redirect_uris[0]
}

async function getEvents(context: string) {
  const currentDate = new Date()

  switch (context) {
    case "today":
      return api.getAll({
        timeMin: startOfDay(currentDate).toISOString(),
        timeMax: endOfDay(currentDate).toISOString()
      })

    case "tomorrow":
      const tom = addDays(currentDate, 1)
      return api.getAll({
        timeMin: startOfDay(tom).toISOString(),
        timeMax: endOfDay(tom).toISOString()
      })

    case "week":
      return api.getAll({
        timeMin: startOfDay(currentDate).toISOString(),
        timeMax: endOfWeek(currentDate).toISOString()
      })

    default:
      throw new Error(`Unknown context ${context}`)
  }
}

const api = new GoogleCalendarApi(oAuthClientInfo, token)
;(async () => {
  const context = _.first(arg._)
  if (!context) throw new Error("Please provide context")

  const events = await getEvents(context)
  for (const event of events) {
    console.log(arg.json ? event : JSON.stringify(event))
  }
})()
