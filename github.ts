import * as Octokit from "@octokit/rest";
import * as _ from "lodash";
import { PullRequest, User, Comment, Issue } from "./types";
import * as moment from "moment";

const owner = process.env.GITHUB_OWNER_NAME;
const repo = process.env.GITHUB_REPO_NAME;

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

export function getIssues(): Promise<PullRequest[]> {
  return octokit.paginate(
    "GET /repos/:owner/:repo/issues",
    {
      owner: "sandaemc",
      repo: "allthedata"
    },
    response =>
      response.data.map(
        issue =>
          ({
            title: issue.title,
            link: issue.html_url,
            status: issue.state,
            number: issue.number,
            owner: { name: issue.user.login } as User
          } as Issue)
      )
  );
}

export function getComments(issueId: number): Promise<Comment[]> {
  return octokit.paginate(
    "GET /repos/:owner/:repo/issues/:number/comments",
    {
      owner: "sandaemc",
      repo: "allthedata",
      number: issueId
    },
    response =>
      response.data.map(
        comment =>
          ({
            body: comment.body,
            createdAt: moment(comment.created_at),
            updatedAt: moment(comment.updated_at),
            commenter: { name: comment.user.login } as User
          } as Comment)
      )
  );
}

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

export async function getCommentsToday(issueId: number): Promise<Comment[]> {
  const comments = await getComments(issueId);
  return comments.filter(c => c.createdAt.isSame(moment(), "day"));
}

export async function getUnApprovedPRsByOwner(dataTeamMembers: User[]) {
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

  return _.sortBy(unapprovedPRs, (pr: PullRequest) => pr.owner);
}
