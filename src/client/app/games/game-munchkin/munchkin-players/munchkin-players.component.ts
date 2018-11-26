import { Component, Input } from '@angular/core';

import { MunchkinPlayerDto } from '@dto/game-munchkin/munchkin-player.dto';

@Component({
  selector: 'bg-munchkin-players',
  templateUrl: './munchkin-players.component.html',
  styleUrls: ['./munchkin-players.component.scss']
})
export class MunchkinPlayersComponent {
  @Input()
  players: MunchkinPlayerDto;

  @Input()
  myUserId: string;
}
