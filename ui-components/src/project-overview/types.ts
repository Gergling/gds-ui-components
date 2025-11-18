import { Temporal } from "@js-temporal/polyfill";

export type Milestone = {
  repo: string;
  id: number;
  title: string;
  description: string;
  open: number;
  closed: number;
  start?: Temporal.PlainDate;
  end?: Temporal.PlainDate;
  group: 'overdue' | 'current' | 'future' | 'closed';
  warning: 'none' | 'start' | 'due';
  progress: {
    days?: {
      milestone: number;
      relative: number;
      proportion: number;
    };
    issues: number;
  };
};

export type RepoApiProps = {
  name: string;
};

export type CommitApiProps = {
  commit: {
    author: {
      date: string;
    };
  };
};

export type CommitFetchProps = {
  commits: CommitApiProps[];
  repo: string;
};

export type MilestoneApiProps = {
  closed_issues: number;
  description: string | null;
  due_on: string | null;
  id: number;
  open_issues: number;
  state: 'open' | 'closed';
  title: string;
};
export type MilestoneFetchProps = {
  repo: string;
  milestones: MilestoneApiProps[];
};
