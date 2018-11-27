import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatModule } from '../../shared/chat/chat.module';
import { SharedUIModule } from '../../shared/shared-ui.module';
import { GameMunchkinComponent } from './game-munchkin.component';
import { gameMunchkinRoutes } from './game-munchkin.routes';
import { GameMunchkinService } from './game-munchkin.service';
import { MunchkinBoardComponent } from './munchkin-board/munchkin-board.component';
import { MunchkinPlayersComponent } from './munchkin-players/munchkin-players.component';

@NgModule({
  imports: [
    RouterModule.forChild(gameMunchkinRoutes),
    SharedUIModule,
    ChatModule
  ],
  declarations: [
    GameMunchkinComponent,
    MunchkinBoardComponent,
    MunchkinPlayersComponent
  ],
  providers: [GameMunchkinService],
  entryComponents: [GameMunchkinComponent],
  exports: [GameMunchkinComponent]
})
export class GameMunchkinModule {}
