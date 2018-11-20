import { NgModule } from '@angular/core';

import { SharedUIModule } from '../../shared/ui/shared-ui.module';
import { GameTestComponent } from './game-test.component';
import { GameTestService } from './game-test.service';
import { TestBoardComponent } from './test-board/test-board.component';
import { TestPlayersComponent } from './test-players/test-players.component';

@NgModule({
  imports: [SharedUIModule],
  declarations: [GameTestComponent, TestPlayersComponent, TestBoardComponent],
  providers: [GameTestService],
  entryComponents: [GameTestComponent],
  exports: [GameTestComponent]
})
export class GameTestModule {}
