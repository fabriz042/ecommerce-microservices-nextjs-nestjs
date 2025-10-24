import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDto } from './dtos/message.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@WebSocketGateway()
export class ChatbotGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Socket;
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('messageFromClient')
  onHandleMessage(client: Socket, messageDto: MessageDto) {
    this.client
      .send('processChatMessage', { message: messageDto.message })
      .subscribe((response) => {
        client.emit('messageFromServer', { message: response });
      });
  }
}
