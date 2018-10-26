import { join } from 'path';

export const config = {
  defaultPort: 3000,
  staticAssetsDirPath: join(__dirname, '..', 'client'),
  indexPagePath: join(__dirname, '..', 'client', 'index.html')
};
