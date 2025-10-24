import { Module } from '@nestjs/common';
import { ChatBotModule } from './modules/ai-core/chat-bot.module';

@Module({
  imports: [ChatBotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
