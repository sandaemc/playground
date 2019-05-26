import { Moment } from "moment";

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
  // TODO: Only In PR not on Issue. Create PullRequest types
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
  status: string;
  reviewer: string;
  submittedAt: Moment;
};
