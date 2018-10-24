import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway('socket.io')
export class HomeGateway {
  @SubscribeMessage('ping')
  onPing(): any {
    console.log('event');
    return { event: 'pong' };
  }
}
