import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common/services/logger.service';
import { AppModule } from './app.module';
import { envs } from 'src/config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('CatalogService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );
  await app.listen();
  logger.log(`**********MS-Chatbot is listening ${envs.port}**********`);
}
bootstrap();
