import { Catch, RpcExceptionFilter, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter {
  private readonly logger = new Logger('RpcExceptionFilter');

  catch(exception: any): Observable<any> {
    this.logger.error(
      JSON.stringify(
        exception?.getResponse?.() || exception?.message || 'Unknown error',
        null,
        2,
      ),
    );

    return throwError(() => exception);
  }
}
