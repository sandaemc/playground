import { google, calendar_v3 } from "googleapis"
import { OAuth2Client } from "googleapis-common"
import { Credentials } from "google-auth-library"

type EventListFilterOptions = {
  timeMin?: string
  timeMax?: string
  maxResults?: number
}

type OAuthClientInfo = {
  id: string
  secret: string
  redirectUri: string
}

export class GoogleCalendarApi {
  private oAuthClient: OAuth2Client
  private calendar: calendar_v3.Calendar

  constructor(oAuthClientInfo: OAuthClientInfo, tokenInfo: Credentials) {
    this.oAuthClient = new google.auth.OAuth2(
      oAuthClientInfo.id,
      oAuthClientInfo.secret,
      oAuthClientInfo.redirectUri
    )

    this.oAuthClient.setCredentials(tokenInfo)
    this.calendar = google.calendar({
      version: "v3",
      auth: this.oAuthClient
    })
  }

  async getCalendars() {
    const response = await this.calendar.calendarList.list()
    if (response.data.items) {
      return response.data.items
    }

    return []
  }

  private async getEvents(calendarId: string, filters: EventListFilterOptions) {
    const resp = await this.calendar.events.list({
      calendarId,
      singleEvents: true,
      orderBy: "startTime",
      ...filters
    })

    return resp.data.items ? resp.data.items : []
  }

  async getAll(filters: EventListFilterOptions) {
    let allEvents: calendar_v3.Schema$Event[] = []
    for (const calendar of await this.getCalendars()) {
      const events = await this.getEvents(calendar.id || "", filters)
      if (events) {
        allEvents = [...allEvents, ...events]
      }
    }

    return allEvents
  }
}
