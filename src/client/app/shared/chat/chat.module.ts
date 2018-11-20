import { NgModule } from '@angular/core';

import { SharedUIModule } from '../shared-ui.module';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

@NgModule({
  imports: [SharedUIModule],
  declarations: [ChatComponent],
  providers: [ChatService],
  exports: [ChatComponent]
})
export class ChatModule {}
