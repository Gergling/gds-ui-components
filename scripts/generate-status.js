const { generate } = require('./badges/generate');
const { getUnitTestRating } = require('./badges/unit-tests');

const jobs = {
  // tag: 
  // publish:
  // basic: getBasicValidationStatus,
  'unit-tests': getUnitTestRating,
};

async function main() {
  // const lintStatus = await getJobStatus('lint'); // Matches job name in ci.yml
  // const testStatus = await getJobStatus('test'); // Matches job name in ci.yml

  // const isLintPassed = lintStatus === 'success';
  // const isTestPassed = testStatus === 'success';

  // Your custom logic here
  // const label = 'CI Status';
  // const message = `${isLintPassed ? 'Lint ✔' : 'Lint ✖'} | ${isTestPassed ? 'Tests ✔' : 'Tests ✖'}`;
  // const color = isLintPassed && isTestPassed ? 'success' : 'critical'; // shields.io named colors

  Object.entries(jobs).forEach(([name, getStatus]) => {
    const { color, label, message } = getStatus();
    generate(name, label, message, color);
  });
}

main();
