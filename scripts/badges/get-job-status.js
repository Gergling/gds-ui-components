const { Octokit } = require('@octokit/rest');

// This script would be run in a GitHub Action
const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env;

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const [owner, repo] = GITHUB_REPOSITORY.split('/');

export async function getJobStatus(jobName) {
  try {
    let run_id = GITHUB_RUN_ID;

    // If no specific run ID is provided, find the latest one on the main branch.
    if (!run_id) {
      console.log('No GITHUB_RUN_ID found, fetching latest run from main branch...');
      const { data: runs } = await octokit.actions.listWorkflowRunsForRepo({
        owner,
        repo,
        event: 'push',
        branch: 'main',
        per_page: 1,
      });
      if (runs.workflow_runs.length === 0) return 'unknown';
      run_id = runs.workflow_runs[0].id;
    }

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
