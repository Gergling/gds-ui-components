import { fetchJson } from "./fetchJson";

export const fetchMilestone = async (id: number) => fetchJson<{
  open_issues: number;
  closed_issues: number;
  title: string;
}>(`https://api.github.com/repos/gergling/grx-gregs-ratings/milestones/${id}`);
