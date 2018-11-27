import { Routes } from '@angular/router';

import { GameTestComponent } from './game-test.component';

export const gameTestRoutes: Routes = [
  {
    path: ':gameId',
    component: GameTestComponent
  }
];
