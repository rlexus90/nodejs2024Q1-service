import * as path from 'path';
import * as fs from 'fs/promises';
import * as yaml from 'yaml';

export const getSwaggerDoc = async () => {
  const filePath = path.join(__dirname, '../..', 'doc', 'api.yaml');
  const data = await fs.readFile(filePath, { encoding: 'utf-8' });
  const swaggerData = yaml.parse(data);
  return swaggerData;
};
