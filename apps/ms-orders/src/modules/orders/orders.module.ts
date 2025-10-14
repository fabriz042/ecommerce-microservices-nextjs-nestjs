import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATALOG_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[
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
  ]
})
export class OrdersModule {}
