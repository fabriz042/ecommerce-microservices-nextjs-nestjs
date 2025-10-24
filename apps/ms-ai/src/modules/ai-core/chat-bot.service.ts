import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import Together from 'together-ai';
import { envs } from 'src/config/envs';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { NATS_SERVICE } from 'src/config';
import { DatabaseService } from '../../common/database.service';

import {
  toolProductSearch,
  searchProductsTool,
} from './tools/searchProduct.tool';
import { toolWebSearch, webSearchTool } from './tools/searchWeb.tool';

export interface ToolCallFunction {
  name?: string;
  arguments?: string;
}
export interface ToolCall {
  index?: number;
  id?: string;
  type?: string;
  function?: ToolCallFunction;
}

export interface MessageData {
  role: string;
  content: string; //tool-response or ia-response
  toolCallId?: string;
  toolName?: string;
  toolArgs?: string; // tool arguments
}

const mcp_tools_chat = [
  toolProductSearch,
  toolWebSearch,
  // More tools
];

@Injectable()
export class ChatBotService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    private readonly databaseService: DatabaseService,
  ) {}

  private together = new Together({ apiKey: envs.apiKey });

  private mergeToolCall(current: ToolCall, incoming: ToolCall): ToolCall {
    return {
      ...current,
      ...incoming,
      function: {
        ...current.function,
        ...incoming.function,
      },
    };
  }

  private saveMessageDB(data: MessageData) {
    return this.databaseService.message.create({
      data,
    });
  }

  processMessage(message: string): Observable<string> {
    return new Observable((subscriber) => {
      (async () => {
        await this.saveMessageDB({
          role: 'user',
          content: message,
        });

        const previousMessages = await this.databaseService.message.findMany({
          orderBy: { createdAt: 'asc' },
          take: 10,
        });

        const contextMessages = previousMessages.map((msg) => {
          if (msg.role === 'tool') {
            const toolMessage: any = {
              role: 'tool' as const,
              content: msg.content,
            };

            if (msg.toolCallId) toolMessage.tool_call_id = msg.toolCallId;
            if (msg.toolName) toolMessage.tool_name = msg.toolName;
            if (msg.toolArgs) toolMessage.tool_args = msg.toolArgs;

            return toolMessage;
          }
          if (msg.role === 'user' || msg.role === 'assistant') {
            return {
              role: msg.role,
              content: msg.content,
            };
          }
        });

        const messages = [
          { role: 'system' as const, content: envs.systemPrompt },
          ...contextMessages,
          { role: 'user' as const, content: message },
        ];

        const streamResponse = this.together.chat.completions.stream({
          messages,
          model: envs.model,
          stream: true,
          tools: mcp_tools_chat,
        });

        let toolCall: ToolCall = {};
        let assistantContent = '';

        for await (const chunk of streamResponse) {
          const delta = chunk.choices[0].delta;

          // If there are tool_calls in the response
          if (delta.tool_calls) {
            const incoming = delta.tool_calls[0];
            toolCall = this.mergeToolCall(toolCall, incoming);

            if (toolCall.function?.name && toolCall.function?.arguments) {

              await this.saveMessageDB({
                role: 'assistant',
                content: '',
                toolCallId: toolCall.id,
                toolName: toolCall.function.name,
                toolArgs: toolCall.function.arguments,
              });

              let response: any;

              // Execute the tool and save the response
              if (toolCall.function.name === 'search_products') {
                response = await searchProductsTool(this.client, toolCall);
              } else if (toolCall.function.name === 'web_search') {
                response = await webSearchTool(toolCall);
              }

              await this.saveMessageDB({
                role: 'tool',
                content: response.content,
                toolCallId: toolCall.id,
                toolName: toolCall.function.name,
              });
            }

          }

          // If there is normal content, send it to the subscriber
          if (delta.content) {
            subscriber.next(delta.content);
            assistantContent += delta.content;
          }
        }

        await this.saveMessageDB({
          role: 'assistant',
          content: assistantContent,
        }); //Save assistant message

        subscriber.complete();
      })();
    });
  }
}
