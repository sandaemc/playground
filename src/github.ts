require("dotenv").config();
import * as Octokit from "@octokit/rest";
import * as _ from "lodash";
import { PullRequest, User, Review } from "./types";
import * as moment from "moment";

const owner = process.env.GITHUB_OWNER_NAME || "";
const repo = process.env.GITHUB_REPO_NAME || "";

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

export function getPRs(): Promise<PullRequest[]> {
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

export async function getReviews(pull_number: number): Promise<Review[]> {
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
            reviewer: review.user.login
            //@ts-ignore
            //submittedAt: moment(review.submitted_at)
          } as Review)
      )
    );
}
