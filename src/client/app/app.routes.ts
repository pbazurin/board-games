import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { GamesComponent } from './games/games.component';
import { TestGameComponent } from './games/test-game/test-game.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'games',
    pathMatch: 'full',
    component: GamesComponent
  },
  {
    path: 'games/test-game/:id',
    pathMatch: 'full',
    component: TestGameComponent
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
