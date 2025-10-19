import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/rpc-errors/rpc-exception.filter';
import { envs } from 'src/config/envs';

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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();

  logger.log(`**********MS-Catalog is listening ${envs.port}**********`);
}
bootstrap();
