import { join } from 'path';

export const config = {
  defaultPort: 3000,
  staticAssetsDirPath: join(__dirname, '..', '..', 'dist', 'client'),
  indexPagePath: join(__dirname, '..', '..', 'dist', 'client', 'index.html')
};
