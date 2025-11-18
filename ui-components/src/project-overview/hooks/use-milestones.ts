import { useEffect, useMemo, useState } from "react";
import { useMilestonesQuery } from "./use-milestones-query";
import { transformMilestoneResults } from "../utilities/transform-milestone-data";
import { Temporal } from "@js-temporal/polyfill";

const REPO_NAMES = [
  'gergling.github.io',
];

export const useMilestones = () => {
  const [today] = useState(() => Temporal.Now.zonedDateTimeISO().toPlainDate());
  const repoMilestonesData = useMilestonesQuery(REPO_NAMES);
  const milestones = useMemo(
    () => transformMilestoneResults(repoMilestonesData, today),
    [repoMilestonesData, today]
  );
  useEffect(
    () => console.log('milestones', milestones),
    [milestones]
  );

  return {
    milestones,
  };
};
