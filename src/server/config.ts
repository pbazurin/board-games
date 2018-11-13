import { join } from 'path';

export const config = {
  port: process.env.PORT || 3000,
  rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  staticAssetsDirPath: join(__dirname, '..', '..', 'dist', 'client'),
  indexPagePath: join(__dirname, '..', '..', 'dist', 'client', 'index.html'),
  generalRoomName: 'general'
};
