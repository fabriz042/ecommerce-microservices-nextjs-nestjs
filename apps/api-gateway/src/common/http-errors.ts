import { HttpException } from '@nestjs/common';

export const HttpErrorFactory = (error: any) => {
  const status = error?.error?.status || error?.status || 500;
  const message =
    error?.error?.message || error?.message || 'Internal Server Error';
  throw new HttpException(message, status);
};
