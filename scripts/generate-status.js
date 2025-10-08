require('dotenv').config();
const { generate } = require('./badges/generate');
const { getUnitTestRating } = require('./badges/unit-tests');

const jobs = {
  // tag: 
  // publish:
  // basic: getBasicValidationStatus,
  'unit-tests': getUnitTestRating,
};

async function main() {
  Object.entries(jobs).forEach(async ([name, getStatus]) => {
    const { color, label, message } = await getStatus();
    generate(name, label, message, color);
  });
}

main();
