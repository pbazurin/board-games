import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatModule } from '../../shared/chat/chat.module';
import { SharedUIModule } from '../../shared/shared-ui.module';
import { GameTestComponent } from './game-test.component';
import { gameTestRoutes } from './game-test.routes';
import { GameTestService } from './game-test.service';
import { TestBoardComponent } from './test-board/test-board.component';
import { TestPlayersComponent } from './test-players/test-players.component';

@NgModule({
  imports: [RouterModule.forChild(gameTestRoutes), SharedUIModule, ChatModule],
  declarations: [GameTestComponent, TestPlayersComponent, TestBoardComponent],
  providers: [GameTestService],
  entryComponents: [GameTestComponent],
  exports: [GameTestComponent]
})
export class GameTestModule {}
