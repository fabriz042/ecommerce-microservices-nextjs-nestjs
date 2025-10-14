import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { CATALOG_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CATALOG_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.catalogMicroserviceHost,
          port: envs.catalogMicroservicePort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
