import { RpcException } from '@nestjs/microservices';

export const RpcNotFound = (message: string) =>
  new RpcException({ status: 404, message });

export const RpcBadRequest = (message: string) =>
  new RpcException({ status: 400, message });
