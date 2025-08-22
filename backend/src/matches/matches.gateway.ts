import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MatchesGateway {
  @WebSocketServer()
  server: Server;

  sendCommentaryUpdate(data: any) {
    this.server.emit('commentaryUpdate', data);
  }
}
