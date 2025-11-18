export const MILESTONE_GROUPS = ['overdue', 'current', 'future', 'closed'] as const;

export type MilestoneGroup = typeof MILESTONE_GROUPS[number];
export type MilestoneGroupKeys = {
  [key in MilestoneGroup]: number;
};

export const MILESTONE_GROUP_KEYS = MILESTONE_GROUPS.reduce(
  (acc, groupName, index) => {
    acc[groupName as MilestoneGroup] = index;
    return acc;
  },
  {} as MilestoneGroupKeys
);
