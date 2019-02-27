import { Moment } from "moment";

export type PullRequest = {
  title: string;
  link: string;
  status: string;
  number: number;
  owner: User;
  branch: string; // Only In PR not on Issue. TODO: Create PullRequest types
  updatedAt: Moment;
};

export type Issue = {
  title: string;
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
