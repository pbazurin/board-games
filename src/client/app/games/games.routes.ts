import { Routes } from '@angular/router';

import { gameMunchkinRoutes } from './game-munchkin/game-munchkin.routes';
import { gameTestRoutes } from './game-test/game-test.routes';
import { GamesComponent } from './games.component';

export const gamesRoutes: Routes = [
  {
    path: 'games',
    children: [
      {
        path: '',
        component: GamesComponent,
      },
      ...gameTestRoutes,
      ...gameMunchkinRoutes
    ]
  }
];
