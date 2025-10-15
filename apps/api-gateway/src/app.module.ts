import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ProductsModule, CategoryModule, OrdersModule } from './modules';
import { NatsModule } from './transports/nats.module';

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
  ],
})
export class AppModule {}
