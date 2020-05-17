import * as Octokit from "@octokit/rest";

const owner: string = process.env.GITHUB_OWNER_NAME || "";
const repo: string = process.env.GITHUB_REPO_NAME || "";
const token: string = process.env.GITHUB_AUTH_TOKEN || "";

if (!owner.length) {
  throw new Error("GITHUB_OWNER_NAME is undefined");
}

if (!repo.length) {
  throw new Error("GITHUB_REPO_NAME is undefined");
}

if (!token.length) {
  throw new Error("GITHUB_AUTH_TOKEN is undefined");
}

const api = new Octokit({ auth: `token ${token}` });

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
