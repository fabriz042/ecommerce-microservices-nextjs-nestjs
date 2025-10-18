import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { NatsModule } from './transports/nats.module';
import {
  ProductsModule,
  CategoryModule,
  OrdersModule,
  BrandModule,
  StatusModule,
  AuthModule,
} from './modules';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CategoryModule,
    OrdersModule,
    NatsModule,
    AuthModule,
    BrandModule,
    StatusModule,
  ],
})
export class AppModule {}
