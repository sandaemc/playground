import * as Octokit from "@octokit/rest";
import * as _ from "lodash";

const owner = process.env.GITHUB_OWNER_NAME;
const repo = process.env.GITHUB_REPO_NAME;

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

export type Issue = {
  title: string;
  link: string;
  status: string;
  number: number;
  owner: User;
  branch: string;
};

export type User = {
  name: string;
};

export function getPRs(): Promise<Issue[]> {
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
        owner: { name: issue.user.login } as User,
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

export async function getApprovedPRsByOwner(dataTeamMembers: User[]) {
  const prs = await getPRs();

  const dataTeamPRs = prs.filter(pr => dataTeamMembers.includes(pr.owner));

  const reviews = _.flatten(
    await Promise.all(dataTeamPRs.map(pr => getReviews(pr.number)))
  );

  const dataTeamPRsWithReviewStatus = dataTeamPRs.map(pr => ({
    ...pr,
    reviews: _.filter(reviews, review => review.prNumber === pr.number)
  }));

  const unapprovedPRs = dataTeamPRsWithReviewStatus.filter(pr => {
    const recentReview: any = _.last(pr.reviews);
    if (recentReview) {
      return recentReview.status !== "APPROVED";
    }

    return true;
  });

  return _.sortBy(unapprovedPRs, (pr: Issue) => pr.owner);
}
