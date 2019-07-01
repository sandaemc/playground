import axios from "axios";

const instance = axios.create({
  baseURL: "https://illuminate.atlassian.net/rest/api/latest",
  headers: {
    Authorization: `Basic ${process.env.JIRA_BASIC_AUTH}`,
    "Content-Type": "application/json"
  }
});

export enum TRANSITIONS {
  ReOpenIssue = 11,
  Closed = 111,
  AwaitingReviewCode = 121,
  AwaitingReviewQA = 131,
  AwaitingReviewUA = 141,
  AwaitingDeployment = 151,
  BlockedIssue = 161,
  Backlog = 171,
  InDiscovery = 191,
  AwaitingMerge = 201,
  AwaitingUX = 211
}

export async function transition(issueKey: string, next: TRANSITIONS) {
  const result = await instance.post(`/issue/${issueKey}/transitions`, {
    transition: {
      id: next
    }
  });

  return result.data;
}
