import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services/logger.service';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { envs } from './config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('AuthService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        url: envs.natsServers,
      },
    },
  );

  logger.log(`**********MS-AUTH is listening**********`);
  await app.listen();
}
bootstrap();
