import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { isArray, isObject } from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    Logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal server error',
      validationErrors: [],
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      errorResponse.message = res?.['error'] || 'Internal server error';

      if (res.hasOwnProperty('message') && isArray(res['message']))
        errorResponse.validationErrors = res['message'];
    }

    response.status(status).json(errorResponse);
  }
}
