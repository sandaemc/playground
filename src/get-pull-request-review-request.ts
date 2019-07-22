require("dotenv").config();
import { getIssues, getIssueEvents } from "./api";
import {
  issueRecent,
  issueEventIsReviewRequest,
  issueEventRequestedReviewerIs,
  issueEventRecent
} from "./filters";
import { issueEventOrderByCreatedAt } from "./sorters";

const REQUESTORS = (process.env.GITHUB_REQUESTORS || "").split(",");
const REVIEWER = process.env.GITHUB_REVIEWER || "";

if (!REVIEWER.length) {
  throw new Error("GITHUB_REVIEWER is undefined");
}

if (!REQUESTORS.length) {
  throw new Error("GITHUB_REQUESTORS is undefined");
}

export async function getReviewRequestsBy(creator: string) {
  const issues = (await getIssues(creator)).filter(issueRecent);

  for (const issue of issues) {
    const issueEvents = (await getIssueEvents(issue.number))
      .filter(issueEventRecent)
      .filter(issueEventIsReviewRequest)
      .filter(issueEventRequestedReviewerIs(REVIEWER))
      .sort(issueEventOrderByCreatedAt)
      .reverse()
      .slice(0, 1);

    if (issueEvents.length) console.log(issue.html_url);
  }
}

(async () => {
  for (const requestor of REQUESTORS) {
    await getReviewRequestsBy(requestor);
  }
})();
