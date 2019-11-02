import { google, calendar_v3 } from "googleapis"
import { OAuth2Client } from "googleapis-common"
import { Credentials } from "google-auth-library"
import { endOfDay } from "date-fns"

type EventListFilterOptions = {
  timeMax?: string
  maxResults?: number
  orderBy?: string
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

  async getEvents(calendarId: string, filterMods: EventListFilterOptions) {
    const defaultFilters: EventListFilterOptions = {
      maxResults: 10,
      orderBy: "startTime"
    }

    const filters: EventListFilterOptions = {
      ...defaultFilters,
      ...filterMods
    }

    const resp = await this.calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      ...filters
    })

    if (resp.data.items) {
      return resp.data.items
    }

    return []
  }

  async getTodaysEvents() {
    const calendars = await this.getCalendars()

    let allEvents: calendar_v3.Schema$Event[] = []
    for (const calendar of calendars) {
      const events = await this.getEvents(calendar.id || "", {
        maxResults: 1,
        timeMax: endOfDay(new Date()).toISOString()
      })

      if (events) {
        allEvents = [...allEvents, ...events]
      }
    }

    return allEvents
  }

  isAllDay(event: calendar_v3.Schema$Event) {
    if ("start" in event) {
      if (event.start && "date" in event.start) {
        return true
      }
    }

    return false
  }
}
