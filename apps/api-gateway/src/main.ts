import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { HttpExceptionFilter } from './common/error-handler/http-errors';

async function bootstrap() {
  const logger = new Logger('Api-Gateway');

  const app = await NestFactory.create(AppModule);

  // Enable CORS for NextJS frontend dev
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('OSK API Documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(envs.port);

  logger.log(`--API Gateway is listening on port ${envs.port}--`);
}
bootstrap();
