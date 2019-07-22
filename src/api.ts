import * as Octokit from "@octokit/rest";

const owner: string = process.env.GITHUB_OWNER_NAME || "";
const repo: string = process.env.GITHUB_REPO_NAME || "";

const api = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

export async function getIssues(creator: string) {
  const { data } = await api.issues.listForRepo({
    owner,
    repo,
    creator
  });

  return data;
}

export async function getIssueEvents(issueNumber: number) {
  const { data } = await api.issues.listEvents({
    owner,
    repo,
    issue_number: issueNumber
  });

  return data;
}
