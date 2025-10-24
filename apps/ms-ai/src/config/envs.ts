import 'dotenv/config';

export const envs = {
  port: Number(process.env.PORT),
  natsServers: process.env.NATS_SERVERS?.split(','),
  apiKey: process.env.API_KEY,
  model: process.env.MODEL!,
  systemPrompt: process.env.SYSTEM_PROMPT!,
  apiKeyWebSearch: process.env.API_KEY_WEB_SEARCH!,
};
