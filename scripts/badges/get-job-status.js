import { Octokit } from '@octokit/rest';

// This script would be run in a GitHub Action
const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env;

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const [owner, repo] = GITHUB_REPOSITORY.split('/');

const getRunId = async () => {
  if (GITHUB_RUN_ID) return GITHUB_RUN_ID;

  console.log('No GITHUB_RUN_ID found, fetching latest run from main branch...');

  try {
    const { data: runs } = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      status: 'completed',
      event: 'push',
      branch: 'main',
      per_page: 1,
    });
    if (runs.workflow_runs.length === 0) return 'unknown';
    return runs.workflow_runs[0].id;
  } catch (error) {
    console.error(`Error fetching last run:`, error);
    return 'error';
  }
};

export async function getJobStatus(jobName) {
  try {
    const run_id = await getRunId();

    const { data: jobs } = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id,
    });

    const job = jobs.jobs.find(j => j.name === jobName);
    return job ? job.conclusion : 'not_found';
  } catch (error) {
    console.error(`Error fetching status for job ${jobName}:`, error);
    return 'error';
  }
}
