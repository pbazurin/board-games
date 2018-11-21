import { Routes } from '@angular/router';

import { gamesRoutes } from './games/games.routes';
import { homeRoutes } from './home/home.routes';

export const appRoutes: Routes = [
  ...homeRoutes,
  ...gamesRoutes,
  {
    path: '**',
    redirectTo: 'home'
  }
];
