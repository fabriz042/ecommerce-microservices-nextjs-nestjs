import 'dotenv/config';

export const envs = {
  natsServers: process.env.NATS_SERVERS?.split(','),
};
