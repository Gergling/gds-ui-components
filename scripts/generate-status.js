const fs = require('fs');

require('dotenv').config();

const { generate } = require('./badges/generate');
const { getUnitTestRating } = require('./badges/unit-tests');
const { STATUS_DIR } = require('./badges/constants');

const jobs = {
  // tag: 
  // publish:
  // basic: getBasicValidationStatus,
  'unit-tests': getUnitTestRating,
};

async function main() {
  if (!fs.existsSync(STATUS_DIR)) {
    console.log('Status directory not found, creating:', STATUS_DIR);
    fs.mkdirSync(STATUS_DIR, { recursive:true });
  }

  Object.entries(jobs).forEach(async ([name, getStatus]) => {
    const { color, label, message } = await getStatus();
    generate(name, label, message, color);
  });
}

main();
