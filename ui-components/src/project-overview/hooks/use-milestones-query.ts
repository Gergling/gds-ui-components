import { useQueries } from "@tanstack/react-query";
import { fetchMilestones } from "../fetchers/milestones";
import { ONE_HOUR_MS } from "../constants";

export const useMilestonesQuery = (repoNames: string[]) => useQueries({
  queries: repoNames.map((name) => {
    return {
      queryFn: () => fetchMilestones(name),
      queryKey: ['milestones', name],
      staleTime: ONE_HOUR_MS,
    };
  }),
});
