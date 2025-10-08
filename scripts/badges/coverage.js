import fs from 'fs';
import path from 'path';
import { interpolateHue } from './interpolate-hue.js';

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

export const getCoverageRating = () => {
  const report = getCoverageReport();
  const sum = props.reduce(reduceSumFactory(report), 0);
  const mean = sum / props.length;
  const hue = interpolateHue(mean, 0, 80);
  const color = `hsl(${hue}, 100%, 40%)`;
  const label = 'Coverage';
  const message = `${mean.toFixed(0)}%`;

  return {
    color,
    label,
    message,
  };
};
