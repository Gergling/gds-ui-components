import { MilestoneApiProps, MilestoneFetchProps } from "../types";
import { fetchJson } from "./fetchJson";

export const fetchMilestones = async (repo: string): Promise<MilestoneFetchProps> => {
  const milestones = await fetchJson<
    MilestoneApiProps[]
  >(`https://api.github.com/repos/Gergling/${repo}/milestones`);
  return {
    milestones,
    repo,
  };
};
