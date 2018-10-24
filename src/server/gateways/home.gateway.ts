import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway('socket.io')
export class HomeGateway {
  @SubscribeMessage('hello')
  onPing(): any {
    console.log('event');
    return { event: 'world' };
  }
}
