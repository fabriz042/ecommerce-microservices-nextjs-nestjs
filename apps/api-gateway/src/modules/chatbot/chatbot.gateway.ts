import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';

@WebSocketGateway()
export class ChatbotGateway {
  constructor(private readonly chatbotService: ChatbotService) {}

  @SubscribeMessage('createChatbot')
  create(@MessageBody() createChatbotDto: CreateChatbotDto) {
    return this.chatbotService.create(createChatbotDto);
  }

  @SubscribeMessage('findAllChatbot')
  findAll() {
    return this.chatbotService.findAll();
  }

  @SubscribeMessage('findOneChatbot')
  findOne(@MessageBody() id: number) {
    return this.chatbotService.findOne(id);
  }

  @SubscribeMessage('updateChatbot')
  update(@MessageBody() updateChatbotDto: UpdateChatbotDto) {
    return this.chatbotService.update(updateChatbotDto.id, updateChatbotDto);
  }

  @SubscribeMessage('removeChatbot')
  remove(@MessageBody() id: number) {
    return this.chatbotService.remove(id);
  }
}
