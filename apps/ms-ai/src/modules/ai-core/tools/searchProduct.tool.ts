import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export const toolProductSearch = {
  type: 'function',
  function: {
    name: 'search_products',
    description: 'Search for products in the store',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: "Product keyword to search for",
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
};

export async function searchProductsTool(client: ClientProxy, toolCall: any) {
  const response = await firstValueFrom(
    client.send('MCPsearchProducts', toolCall),
  );
  return response;
}
