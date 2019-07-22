require("dotenv").config();
import { getIssues, getIssueEvents } from "./api";
import {
  issueRecent,
  issueEventIsReviewRequest,
  issueEventRequestedReviewerIs,
  issueEventRecent
} from "./filters";
import { issueEventOrderByCreatedAt } from "./sorters";

export async function getReviewRequestsBy(creator: string) {
  const issues = (await getIssues("pcellano")).filter(issueRecent);
  const issueIds = issues.map(c => c.number);

  for (const id of issueIds) {
    const issueEvents = (await getIssueEvents(id))
      .filter(issueEventRecent)
      .filter(issueEventIsReviewRequest)
      .filter(issueEventRequestedReviewerIs("sandaemc"))
      .sort(issueEventOrderByCreatedAt)
      .reverse()
      .slice(0, 1);

    console.log(issueEvents);
  }
}

(async () => {
  await getReviewRequestsBy("pcellano");
  await getReviewRequestsBy("eoporto");
  await getReviewRequestsBy("arielmanayon");
})();
