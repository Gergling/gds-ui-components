import path from 'path';
import fs from 'fs';

export const generate = (name, label, message, color) => {
  const statusJson = {
    schemaVersion: 1,
    label,
    message,
    color,
  };

  const filePath = path.resolve('status', `status-badge-${name}.json`);

  fs.writeFileSync(filePath, JSON.stringify(statusJson, null, 2));
  console.log(`Generated ${filePath}:`, statusJson);
};
