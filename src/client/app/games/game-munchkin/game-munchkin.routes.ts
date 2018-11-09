import { Routes } from '@angular/router';

import { GameMunchkinComponent } from './game-munchkin.component';

export const gameMunchkinRoutes: Routes = [
  {
    path: 'munchkin/:id',
    component: GameMunchkinComponent
  }
];
