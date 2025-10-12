import 'dotenv/config';

export const envs = {
  port: Number(process.env.PORT),
  productsMicroservicePort: Number(process.env.PRODUCTS_MICROSERVICE_PORT),
  productsMicroserviceHost: process.env.PRODUCTS_MICROSERVICE_HOST,
};
