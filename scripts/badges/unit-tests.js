import fs from 'fs';
import path from 'path';
import { interpolateHue } from './interpolate-hue.js';
import { getJobStatus } from './get-job-status.js';

const label = 'Unit Tests';

const coverageSummaryPath = path.resolve(
  'ui-components',
  'coverage',
  'coverage-summary.json'
);

const getCoverageReport = () => {
  try {
    if (fs.existsSync(coverageSummaryPath)) {
      return JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));
    }

    console.error('Coverage report not found at:', coverageSummaryPath);
    throw new Error('Coverage report not found at:' + coverageSummaryPath);
  } catch (e) {
    console.error('Error reading coverage-summary.json:', e);
    throw e;
  }
}

const props = [
  'lines',
  'statements',
  'functions',
  'branches',
];

const reduceSumFactory = (report) =>
  (acc, prop) =>
    acc + report.total[prop].pct;

const getCoverageMean = () => {
  const report = getCoverageReport();
  const sum = props.reduce(reduceSumFactory(report), 0);
  if (sum === 0) return 0;
  const mean = sum / props.length;
  return mean;
}

const getColour = (hue) => `hsl(${hue}, 100%, 40%)`;

const getFailedStatus = (message) => ({
  color: getColour(0),
  label,
  message,
});

export const getUnitTestRating = async () => {
  const testsStatus = await getJobStatus('Run unit tests');
  if (testsStatus !== 'success') return getFailedStatus('Failed');

  const mean = getCoverageMean();

  if (mean === 0) return getFailedStatus('No coverage');

  const hue = interpolateHue(mean, 0, 80);
  const color = getColour(hue);
  const message = `${mean.toFixed(0)}%`;

  return {
    color,
    label,
    message,
  };
};
