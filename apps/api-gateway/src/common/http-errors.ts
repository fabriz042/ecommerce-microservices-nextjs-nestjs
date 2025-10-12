import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception?.error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception?.error?.message || 'Internal Server Error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
