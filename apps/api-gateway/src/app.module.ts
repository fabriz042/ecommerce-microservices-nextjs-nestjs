import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ProductsModule, CategoryModule, OrdersModule } from './modules';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './modules/auth/auth.module';

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
  ],
})
export class AppModule {}
