import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatBotService } from './chat-bot.service';

@Controller()
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @MessagePattern('processChatMessage')
  async processMessage(@Payload() payload: { message: string }) {
    return this.chatBotService.processMessage(payload.message);
  }
}
