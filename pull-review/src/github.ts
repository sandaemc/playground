import * as Octokit from "@octokit/rest";
import * as _ from "lodash";
import { PullRequest, User, Review, ReviewStatus } from "./types";
import * as moment from "moment";

const owner = process.env.GITHUB_OWNER_NAME || "";
const repo = process.env.GITHUB_REPO_NAME || "";

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

function getPulls(): Promise<PullRequest[]> {
  return octokit.paginate(
    "GET /repos/:owner/:repo/pulls",
    {
      owner,
      repo
    },
    response =>
      response.data.map(
        issue =>
          ({
            title: issue.title,
            link: issue.html_url,
            status: issue.state,
            number: issue.number,
            owner: { name: issue.user.login } as User,
            branch: issue.head.ref,
            updatedAt: moment(issue.updated_at)
          } as PullRequest)
      )
  );
}

async function getReviews(pull_number: number): Promise<Review[]> {
  return octokit.pulls
    .listReviews({
      owner,
      repo,
      pull_number
    })
    .then(response =>
      response.data.map(
        review =>
          ({
            prNumber: pull_number,
            body: review.body,
            status: review.state,
            reviewer: review.user.login,
            //@ts-ignore
            submittedAt: moment(review.submitted_at)
          } as Review)
      )
    );
}

export async function getPullsReviewedToday() {
  const byDataTeam = (pr: PullRequest) =>
    pr.owner.name.match(/^(arielmanayon|pcellano|eoporto)/);

  const inTheLastThreeDays = (pr: PullRequest) =>
    pr.updatedAt >= moment().subtract(3, "days");

  const prs = (await getPulls()).filter(byDataTeam).filter(inTheLastThreeDays);

  const prsReviewedToday: { pull: PullRequest; review: Review }[] = [];

  for (const pr of prs) {
    const reviews = await getReviews(pr.number);

    const latest = _.last(reviews);
    if (latest === undefined) {
      continue;
    }

    if (
      latest.submittedAt.isSame(moment(), "day") &&
      (latest.status === ReviewStatus.APPROVED ||
        latest.status === ReviewStatus.CHANGES_REQUESTED)
    ) {
      prsReviewedToday.push({
        pull: pr,
        review: latest
      });
    }
  }

  return prsReviewedToday;
}
