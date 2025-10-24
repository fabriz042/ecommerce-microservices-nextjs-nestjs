import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';
import { NATS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { DatabaseService } from 'src/common/database.service';

@Module({
  controllers: [ChatBotController],
  providers: [ChatBotService, DatabaseService],
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
})
export class ChatBotModule {}
