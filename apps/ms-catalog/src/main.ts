import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('ProductsService');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: process.env.PORT,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen();

  logger.log(`**********MS-Catalog is listening ${process.env.PORT}**********`);
}
bootstrap();
