import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway('socket.io')
export class HomeGateway {
  @SubscribeMessage('hello')
  onPing(): any {
    return { event: 'world' };
  }
}
