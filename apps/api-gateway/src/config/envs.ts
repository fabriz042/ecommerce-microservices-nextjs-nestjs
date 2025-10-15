import 'dotenv/config';

export const envs = {
  port: Number(process.env.PORT),
  catalogMicroservicePort: Number(process.env.CATALOG_MICROSERVICE_PORT),
  catalogMicroserviceHost: process.env.CATALOG_MICROSERVICE_HOST,

  ordersMicroservicePort: Number(process.env.ORDERS_MICROSERVICE_PORT),
  ordersMicroserviceHost: process.env.ORDERS_MICROSERVICE_HOST,

  natsServers: process.env.NATS_SERVERS?.split(','),
};
