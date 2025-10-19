import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: any;

    // if it is a NestJS HttpException, like pipes, dtos
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse;
    }
    // If it is a microservice error (RpcException)
    else if (exception?.error?.status) {
      status = exception.error.status;
      message = exception.error.message || 'Microservice Error';
    }
    // Unknown error
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
      this.logger.error('Unhandled exception:', exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
