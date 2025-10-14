import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { envs } from 'src/config/envs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATALOG_SERVICE } from 'src/config/services';

@Module({
  controllers: [CategoryController],
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
export class CategoryModule {}
