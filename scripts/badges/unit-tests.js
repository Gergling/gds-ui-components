import fs from 'fs';
import path from 'path';
import { interpolateHue } from './interpolate-hue.js';
import { getJobStatus } from './get-job-status.js';

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

const getCoverageHue = () => {
  const report = getCoverageReport();
  const sum = props.reduce(reduceSumFactory(report), 0);
  if (sum === 0) return 0;
  const mean = sum / props.length;
  const hue = interpolateHue(mean, 0, 80);
  return hue;
}

const getColour = (hue) => `hsl(${hue}, 100%, 40%)`;

export const getUnitTestRating = () => {
  const testsStatus = getJobStatus('tests');
  const label = 'Unit Tests';
  if (testsStatus !== 'success') return {
    color: getColour(0),
    label,
    message: 'Failed',
  };

  const hue = getCoverageHue();

  if (hue === 0) return {
    color: getColour(0),
    label,
    message: 'No coverage',
  };

  const color = `hsl(${hue}, 100%, 40%)`;
  const message = `${mean.toFixed(0)}%`;

  return {
    color,
    label,
    message,
  };
};
