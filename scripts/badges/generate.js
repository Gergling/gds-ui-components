import path from 'path';
import fs from 'fs';
import { STATUS_DIR } from './constants.js';

export const generate = (name, label, message, color) => {
  const statusJson = {
    schemaVersion: 1,
    label,
    message,
    color,
  };

  const filePath = path.resolve(STATUS_DIR, `${name}.json`);

  fs.writeFileSync(filePath, JSON.stringify(statusJson, null, 2));
  console.log(`Generated ${filePath}:`, statusJson);
};
