import { envs } from 'src/config/envs';
import { ToolCall } from '../chat-bot.service';

export const toolWebSearch = {
  type: 'function',
  function: {
    name: 'web_search',
    description: 'Search the web for a query on your smartphone',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The search query.',
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
};

export async function webSearchTool(
  toolCall: ToolCall,
  count = 5,
  safesearch = 'off',
) {
  const params = new URLSearchParams({
    q: JSON.parse(toolCall.function!.arguments!).query,
    count: count.toString(),
    safesearch,
  });

  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?${params}`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'x-subscription-token': envs.apiKeyWebSearch,
      },
    },
  );

  const raw = await response.json();

  interface SearchResult {
    title: string;
    url: string;
    description: string;
    extra_snippets?: string[];
  }

  const query = raw.query?.original as string;

  const webResults = (raw.web?.results || []).map(
    (SearchResult: SearchResult) => ({
      title: SearchResult.title,
      url: SearchResult.url,
      description: SearchResult.description,
      extra_snippets: (SearchResult.extra_snippets ?? []).join(' '),
    }),
  );

  const videoResults = (raw.videos?.results || []).map(
    (SearchResult: SearchResult) => ({
      title: SearchResult.title,
      url: SearchResult.url,
      description: SearchResult.description,
      extra_snippets: (SearchResult.extra_snippets ?? []).join(' '),
    }),
  );

  const newsResults = (raw.news?.results || []).map(
    (SearchResult: SearchResult) => ({
      title: SearchResult.title,
      url: SearchResult.url,
      description: SearchResult.description,
      extra_snippets: (SearchResult.extra_snippets ?? []).join(' '),
    }),
  );

  const cleaned = { query, webResults, videoResults, newsResults };

  return {
    role: 'tool',
    name: toolCall.function!.name,
    tool_call_id: toolCall.id,
    content: cleaned,
  };
}
