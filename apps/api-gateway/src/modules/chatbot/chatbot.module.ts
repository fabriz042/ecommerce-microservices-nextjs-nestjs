import { Module } from '@nestjs/common';
import { ChatbotGateway } from './chatbot.gateway';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  providers: [ChatbotGateway],
  imports: [NatsModule],
})
export class ChatbotModule {}
