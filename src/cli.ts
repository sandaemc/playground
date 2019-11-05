#!/usr/bin/env node
import * as fs from "fs"
import { GoogleCalendarApi } from "./api"
import * as yargs from "yargs"
import * as _ from "lodash"
import { startOfDay, endOfDay, set, addMinutes } from "date-fns"

interface CLIArguments {
  [x: string]: unknown
  credential: string
  token: string
  _: ArrayLike<string>
}

const arg: CLIArguments = yargs.options({
  credential: { type: "string", demandOption: true },
  token: { type: "string", demandOption: true }
}).argv

const apiCredential = JSON.parse(fs.readFileSync(arg.credential).toString())
const token = JSON.parse(fs.readFileSync(arg.token).toString())

const oAuthClientInfo = {
  id: apiCredential.installed.client_id,
  secret: apiCredential.installed.client_secret,
  redirectUri: apiCredential.installed.redirect_uris[0]
}

async function getEvents(context: string) {
  switch (context) {
    case "today":
      return api.getAll({
        timeMin: startOfDay(new Date()).toISOString(),
        timeMax: endOfDay(new Date()).toISOString()
      })

    case "morning":
      return api.getAll({
        timeMin: set(new Date(), {
          hours: 8,
          minutes: 0,
          seconds: 0
        }).toISOString(),
        timeMax: set(new Date(), {
          hours: 12,
          minutes: 0,
          seconds: 0
        }).toISOString()
      })

    case "afternoon":
      return api.getAll({
        timeMin: set(new Date(), {
          hours: 13,
          minutes: 0,
          seconds: 0
        }).toISOString(),
        timeMax: set(new Date(), {
          hours: 19,
          minutes: 0,
          seconds: 0
        }).toISOString()
      })

    case "evening":
      return api.getAll({
        timeMin: set(new Date(), {
          hours: 20,
          minutes: 0,
          seconds: 0
        }).toISOString(),
        timeMax: set(new Date(), {
          hours: 23,
          minutes: 0,
          seconds: 0
        }).toISOString()
      })

    case "soon":
      return api.getAll({
        timeMin: new Date().toISOString(),
        timeMax: addMinutes(new Date(), 30).toISOString()
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
  console.log(events)
})()
