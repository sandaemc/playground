import { IssuesListEventsResponseItem } from "@octokit/rest";

export function issueEventOrderByCreatedAt(
  a: IssuesListEventsResponseItem,
  b: IssuesListEventsResponseItem
) {
  if (a.created_at < b.created_at) return -1;
  if (a.created_at > b.created_at) return 1;
  return 0;
}
