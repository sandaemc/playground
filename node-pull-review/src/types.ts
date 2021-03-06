import { Moment } from "moment";

export enum ReviewStatus {
  APPROVED = "APPROVED",
  CHANGES_REQUESTED = "CHANGES_REQUESTED"
}

export type Commit = {
  sha: string;
  author: User;
  message: string;
  comittedAt: Moment;
};

export type PullRequest = {
  title: string;
  link: string;
  status: string;
  number: number;
  owner: User;
  branch: string;
  updatedAt: Moment;
};

export type Issue = {
  title: string;
  body: string;
  link: string;
  status: string;
  number: number;
  owner: User;
  updatedAt: Moment;
};

export type Comment = {
  parentId: number;
  body: string;
  commenter: User;
  createdAt: Moment;
  updatedAt: Moment;
};

export type User = {
  name: string;
};

export type Review = {
  prNumber: number;
  body: string;
  status: ReviewStatus;
  reviewer: string;
  submittedAt: Moment;
};
