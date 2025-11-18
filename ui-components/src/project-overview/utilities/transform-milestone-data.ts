import { Temporal } from "@js-temporal/polyfill";
import { Milestone, MilestoneApiProps, MilestoneFetchProps } from "../types";
import { extractStartDate } from "./extract-start-date";
import { UseQueryResult } from "@tanstack/react-query";
import { MILESTONE_GROUP_KEYS } from "../config";

const extractPlainDate = (date: string | null) => {
  if (!date) return;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return Temporal.Instant.from(date).toZonedDateTimeISO(timeZone).toPlainDate();
};

const extractPlainEndDate = (
  due_on: MilestoneApiProps['due_on']
) => extractPlainDate(due_on);

const extractPlainStartDate = (
  description: MilestoneApiProps['description']
): Temporal.PlainDate | undefined => {
  const date = extractStartDate(description);
  return date ? Temporal.PlainDate.from(date) : undefined;
};

const getDaysBetween = (
  start: Temporal.PlainDate,
  end: Temporal.PlainDate
) => {
  return end.since(start).total('days');
};

const getMilestoneProgress = (
  open: number,
  closed: number,
  relative: Temporal.PlainDate,
  start?: Temporal.PlainDate,
  end?: Temporal.PlainDate,
): Milestone['progress'] => {
  const issues = open + closed ? closed / (open + closed) : 0;
  if (start && end) {
    const milestoneDays = getDaysBetween(start, end);
    const relativeDays = getDaysBetween(start, relative);
    const proportion = relativeDays / milestoneDays;
    return {
      days: {
        milestone: milestoneDays,
        relative: relativeDays,
        proportion,
      },
      issues,
    };
  }
  return { issues };
}

const getWarning = (
  start?: Temporal.PlainDate,
  end?: Temporal.PlainDate
): Milestone['warning'] => {
  if (start === end || (start && end)) return 'none';
  if (!start) return 'start';
  return 'due';
}

const getDateRangeMeta = (
  state: MilestoneApiProps['state'],
  relative: Temporal.PlainDate,
  closed: MilestoneApiProps['closed_issues'],
  start?: Temporal.PlainDate,
  end?: Temporal.PlainDate
): Pick<Milestone, 'group' | 'warning'> => {
  // If it's closed, we don't care about the data quality too much.
  if (state === 'closed') return { group: 'closed', warning: 'none' };

  // If we have no dates and nothing is closed, we can assume we haven't
  // started the milestone yet.
  const hasNoDates = !start && !end;
  if (hasNoDates && closed === 0) return { group: 'future', warning: 'none' };

  // We derive a warning based on the start and end dates (as the milestone
  // may not have them both).
  const warning = getWarning(start, end);

  // We check whether the milestone starts after or ends before the relative
  // date (usually today). If there is no date, we assume it doesn't apply to
  // those criteria.
  const startsLater = start ? Temporal.PlainDate.compare(start, relative) > 0 : false;
  const endsEarlier = end ? Temporal.PlainDate.compare(relative, end) > 0 : false;

  if (!startsLater) {
    if (!endsEarlier) {
      // The relative date counts as being "within" the date range.
      return { group: 'current', warning };
    }

    // The milestone ended but wasn't closed, so it's overdue.
    return { group: 'overdue', warning };
  }

  // The milestone hasn't started yet.
  return { group: 'future', warning };
};

const transformMilestoneFetchData = (
  data: MilestoneFetchProps,
  relative: Temporal.PlainDate
) => data.milestones.map(({
  closed_issues: closed,
  description,
  due_on,
  open_issues: open,
  ...props
}): Milestone => {
  const start = extractPlainStartDate(description);
  const end = extractPlainEndDate(due_on);
  const meta = getDateRangeMeta(props.state, relative, closed, start, end);
  const progress = getMilestoneProgress(open, closed, relative, start, end);
  return {
    ...props,
    ...meta,
    closed,
    description: description || '',
    end: extractPlainEndDate(due_on),
    open,
    progress,
    repo: data.repo,
    start: extractPlainStartDate(description),
  };
});

const compareOptionalDates = (
  a?: Temporal.PlainDate,
  b?: Temporal.PlainDate
) => {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return Temporal.PlainDate.compare(a, b);
};

export const transformMilestoneResults = (
  result: UseQueryResult<MilestoneFetchProps, Error>[],
  relative: Temporal.PlainDate
) => result.reduce<Milestone[]>(
  (acc, { data }) => {
    if (data) {
      const milestone = transformMilestoneFetchData(data, relative);
      return [...acc, ...milestone];
    }
    return acc;
  },
  []
).sort((a, b) => {
  // Ascending is a - b
  // Group: Overdue -> Current -> Future -> Closed
  const groupComparison = MILESTONE_GROUP_KEYS[a.group] - MILESTONE_GROUP_KEYS[b.group];
  if (groupComparison !== 0) return groupComparison;

  // Due date: ascending -> undefined
  const dueComparison = compareOptionalDates(a.end, b.end);
  if (dueComparison !== 0) return dueComparison;

  // Start date: ascending -> undefined
  const startComparison = compareOptionalDates(a.start, b.start);
  if (startComparison !== 0) return startComparison;

  // Repo: ascending
  const repoComparison = a.repo.localeCompare(b.repo);
  if (repoComparison !== 0) return repoComparison;

  // Title: ascending
  return a.title.localeCompare(b.title);
});
