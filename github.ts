import * as Octokit from "@octokit/rest";

const owner = process.env.GITHUB_OWNER_NAME;
const repo = process.env.GITHUB_REPO_NAME;

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

export function getPRs() {
  return octokit.paginate(
    "GET /repos/:owner/:repo/pulls",
    {
      owner,
      repo
    },
    response =>
      response.data.map(issue => ({
        title: issue.title,
        link: issue.html_url,
        status: issue.state,
        number: issue.number,
        owner: issue.user.login,
        branch: issue.head.ref
      }))
  );
}

export async function getReviews(prNumber: number) {
  const reviews = await octokit.paginate(
    "GET /repos/:owner/:repo/pulls/:number/reviews",
    {
      owner,
      repo,
      number: prNumber
    },
    response =>
      response.data.map(review => ({
        prNumber: prNumber,
        body: review.body,
        status: review.state,
        reviewer: review.user.login
      }))
  );

  return reviews;
}
