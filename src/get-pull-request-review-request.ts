require("dotenv").config();
import { getIssues, getIssueEvents } from "./api";
import {
  issueRecent,
  issueEventIsReviewRequest,
  issueEventRequestedReviewerIs,
  issueEventRecent
} from "./filters";
import { issueEventOrderByCreatedAt } from "./sorters";
import pushEvent from "./push-event";

const requestors = (process.env.GITHUB_REQUESTORS || "").split(",");
const reviewer = process.env.GITHUB_REVIEWER || "";

if (!reviewer.length) {
  throw new Error("GITHUB_REVIEWER is undefined");
}

if (!requestors.length) {
  throw new Error("GITHUB_REQUESTORS is undefined");
}

export async function getReviewRequestsBy(creator: string) {
  const issues = (await getIssues(creator)).filter(issueRecent);

  for (const issue of issues) {
    const issueEvents = (await getIssueEvents(issue.number))
      .filter(issueEventRecent)
      .filter(issueEventIsReviewRequest)
      .filter(issueEventRequestedReviewerIs(reviewer))
      .sort(issueEventOrderByCreatedAt)
      .reverse()
      .slice(0, 1);

    if (issueEvents.length) pushEvent(issue.html_url);
  }
}

(async () => {
  for (const requestor of requestors) {
    await getReviewRequestsBy(requestor);
  }
})();
