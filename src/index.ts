import * as fs from "fs"
import { GoogleCalendarApi } from "./api"
import * as yargs from "yargs"

interface CLIArguments {
  [x: string]: unknown
  credential: string
  token: string
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

const api = new GoogleCalendarApi(oAuthClientInfo, token)
;(async () => {
  const events = await api.getTodaysEvents()
  console.log(events)
})()

/*
function getDate(event: calendar_v3.Schema$Event, prop: string) {
  if (prop in event) {
    if (event[prop] && "date" in event[prop]) {
      return new Date(event[prop].date)
    }

    return new Date(event[prop].dateTime)
  }

  throw new Error("No date property")
}
*/
