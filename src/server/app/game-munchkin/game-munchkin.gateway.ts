import { UseFilters, UseGuards } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { GameRemovedAction, GameUserLeftAction, LeaveGameAction, UserGameRelationPayload } from '@dto/game/game-actions';
import { GameType } from '@dto/game/game-type.enum';
import { UserDataChangedAction } from '@dto/user/user-actions';

import { config } from '../../config';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { GamesService } from '../games/games.service';
import { SocketService } from '../socket/socket.service';
import { SubscribeAction } from '../subscribe-action.decorator';
import { UsersService } from '../users/users.service';
import { ValidUserSocketGuard } from '../users/valid-user-socket.guard';
import { GameMunchkin } from './game-munchkin';
import { GameMunchkinService } from './game-munchkin.service';

@WebSocketGateway()
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserSocketGuard)
export class GameMunchkinGateway implements OnGatewayInit {
  constructor(
    private usersService: UsersService,
    private socketService: SocketService,
    private gamesService: GamesService,
    private gameMunchkinService: GameMunchkinService
  ) {}

  afterInit() {
    this.usersService.userDisconnected$.subscribe(user => {
      this.gamesService
        .getRunningGames(GameType.Munchkin)
        .forEach((game: GameMunchkin) => {
          this.leaveGame(user.id, game);
        });
    });
  }

  @SubscribeAction(LeaveGameAction)
  onLeaveGame(socket: Socket, action: LeaveGameAction): void {
    const userId = this.usersService.getUserBySocketId(socket.id).id;
    const gameId = action.payload;

    if (!this.gamesService.isGameExists(gameId, GameType.Munchkin)) {
      return;
    }

    const targetGame = <GameMunchkin>this.gamesService.getGame(gameId);

    this.leaveGame(userId, targetGame, socket);
  }

  @SubscribeAction(UserDataChangedAction)
  onUserDataChanged(socket: Socket, action: UserDataChangedAction): void {
    const userId = this.usersService.getUserBySocketId(socket.id).id;
    const activePlayerGames: string[] = [];

    this.gamesService.getRunningGames(GameType.Munchkin).forEach(g => {
      if (g.players.find(p => p.id === userId)) {
        activePlayerGames.push(g.id);
      }
    });

    action.payload.password = null;

    activePlayerGames.forEach(gameId => {
      this.socketService.sendToOthersInRoom(gameId, socket, action);
    });
  }

  private leaveGame(userId: string, game: GameMunchkin, socket?: Socket) {
    const isValidGame = this.gameMunchkinService.removeUserFromGame(
      userId,
      game
    );

    if (!isValidGame) {
      return;
    }

    const userLeftAction = new GameUserLeftAction(<UserGameRelationPayload>{
      gameId: game.id,
      userId: userId
    });

    if (socket) {
      socket.leave(game.id);
      this.socketService.sendToOthersInRoom(game.id, socket, userLeftAction);

      socket.join(config.generalRoomName);
      this.socketService.sendToOthersInRoom(
        config.generalRoomName,
        socket,
        userLeftAction
      );
    } else {
      this.socketService.sendToAllInRoom(game.id, userLeftAction);
      this.socketService.sendToAllInRoom(
        config.generalRoomName,
        userLeftAction
      );
    }

    const targetGame = this.gamesService
      .getRunningGames(GameType.Munchkin)
      .find(g => g.id === game.id);

    if (targetGame.players.length) {
      return;
    }

    this.gamesService.removeGame(game.id);
    const gameRemovedAction = new GameRemovedAction(game.id);

    if (socket) {
      this.socketService.sendToOthersInRoom(
        config.generalRoomName,
        socket,
        gameRemovedAction
      );
    } else {
      this.socketService.sendToAllInRoom(
        config.generalRoomName,
        gameRemovedAction
      );
    }
  }
}
