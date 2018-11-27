import { Routes } from '@angular/router';

import { GamesComponent } from './games.component';

export const gamesRoutes: Routes = [
  {
    path: 'games',
    children: [
      {
        path: '',
        component: GamesComponent
      },
      {
        path: 'munchkin',
        loadChildren:
          './games/game-munchkin/game-munchkin.module#GameMunchkinModule'
      },
      {
        path: 'test',
        loadChildren: './games/game-test/game-test.module#GameTestModule'
      }
    ]
  }
];
