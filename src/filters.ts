import {
  IssuesListForRepoResponseItem,
  IssuesListEventsResponseItem,
  IssuesListEventsResponseItemActor
} from "@octokit/rest";
import * as moment from "moment";

type IssuesListEventsResponseItemReviewRequested = IssuesListEventsResponseItem & {
  review_requester: IssuesListEventsResponseItemActor;
  requested_reviewer: IssuesListEventsResponseItemActor;
};

export function issueRecent(issue: IssuesListForRepoResponseItem) {
  return moment(issue.updated_at).isAfter(moment().subtract(7, "days"));
}

export function issueEventRecent(event: IssuesListEventsResponseItem) {
  return moment(event.created_at).isSameOrAfter(
    moment().subtract(15, "minutes")
  );
}

export function issueEventIsReviewRequest(
  event: IssuesListEventsResponseItem
): boolean {
  return event.event === "review_requested";
}

export function issueEventRequestedReviewerIs(login: string) {
  return (event: IssuesListEventsResponseItemReviewRequested) =>
    event.requested_reviewer.login === login;
}
