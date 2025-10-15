import 'dotenv/config';

export const envs = {
  port: Number(process.env.PORT),
  natsServers: process.env.NATS_SERVERS?.split(','),
  jwtSecret: process.env.JWT_SECRET,
};
