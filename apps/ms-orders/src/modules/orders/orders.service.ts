import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '../../../generated/prisma';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('____________Orders connected to the database');
  }
  //Get all
  findAll() {
    return this.order.findMany();
  }

  //Get one
  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id },
      include: {
        OrderItem: {
          select: { price: true, productId: true, quantity: true },
        },
      },
    });

    // Get product details from Catalog service and validate them
    const productsIds = order?.OrderItem.map(
      (orderItem) => orderItem.productId,
    );
    const products = await firstValueFrom(
      this.client.send('validateProduct', productsIds),
    );
    if (!order)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order ${id} not found`,
      });
    return {
      ...order,
      OrderItem: order.OrderItem.map((OrderItem) => ({
        ...OrderItem,
        name: products.find((products) => products.id === OrderItem.productId)
          .name,
      })),
    };
  }

  //Create
  async create(createOrderDto: CreateOrderDto) {
    try {
      // Validate products
      const productsIds = createOrderDto.items.map((item) => item.productId);
      const products = await firstValueFrom(
        this.client.send('validateProduct', productsIds),
      );
      //Calculate values
      const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
        const price = products.find(
          (products) => products.id === orderItem.productId,
        ).price;
        return price * orderItem.quantity;
      }, 0);

      // Calculate total items
      const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0);

      // Create order in DB
      const order = await this.order.create({
        data: {
          totalAmount: totalAmount,
          totalItems: totalItems,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map((orderItem) => ({
                price: products.find(
                  (products) => products.id === orderItem.productId,
                ).price,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              })),
            },
          },
        },
        include: {
          OrderItem: {
            select: { price: true, productId: true, quantity: true },
          },
        },
      });

      return {
        ...order,
        OrderItem: order.OrderItem.map((OrderItem) => ({
          ...OrderItem,
          name: products.find((products) => products.id === OrderItem.productId)
            .name,
        })),
      };
    } catch (error) {
      this.logger.error('Error creating order', error);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Check the order data',
      });
    }
  }

  //Change status
  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status },
    });
  }
}
