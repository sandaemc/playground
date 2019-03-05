import * as Octokit from "@octokit/rest";
import * as _ from "lodash";
import { PullRequest, User, Comment, Issue, Commit, Review } from "./types";
import * as moment from "moment";

const owner = process.env.GITHUB_OWNER_NAME || "";
const repo = process.env.GITHUB_REPO_NAME || "";

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_AUTH_TOKEN}`
});

export function getEvents(user: string) {
  return octokit.paginate("GET /users/:username/events", {
    username: "sandaemc"
  });
}

export function getCommits(branchName: string): Promise<Commit[]> {
  //`GET /repos/:owner/:repo/compare/master...${branchName}`,
  return octokit.paginate(
    `GET /repos/:owner/:repo/compare/master...${branchName}`,
    {
      owner,
      repo
    },
    response =>
      response.data.commits.map(
        c =>
          ({
            sha: c.sha,
            author: { name: c.commit.author.name } as User,
            message: c.commit.message,
            comittedAt: moment(c.commit.author.date)
          } as Commit)
      )
  );
}

export function getIssues(): Promise<Issue[]> {
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
            body: issue.body,
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

export async function getReviews(number: number): Promise<Review[]> {
  return octokit.pulls
    .listReviews({
      owner,
      repo,
      number
    })
    .then(response =>
      response.data.map(
        review =>
          ({
            prNumber: number,
            body: review.body,
            status: review.state,
            reviewer: review.user.login,
            //@ts-ignore
            submittedAt: moment(review.submitted_at)
          } as Review)
      )
    );
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
