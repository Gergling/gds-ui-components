const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const rootPackageJsonPath = path.resolve(rootPath, 'package.json');
const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
const version = rootPackageJson.version;

console.log(`Syncing all package versions to ${version}`);

const filesToUpdate = [
  'every-app',
  'ui-components',
].map(packageName => path.resolve(rootPath, packageName, 'package.json'));

filesToUpdate.forEach(file => {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json.version = version;
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
  console.log(`Updated ${file} to version ${version}`);
});

console.log('All package versions synced successfully!');
