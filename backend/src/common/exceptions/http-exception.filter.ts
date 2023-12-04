import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (!(exception instanceof ValidationError)) {
      response.status(status).json({
        statusCode: status,
        message: exception.getResponse(), // Use getResponse() para obter a mensagem correta
      });
    } else {
      // Se for uma ValidationError, deixa passar sem fazer nada
      throw exception;
    }
  }
}
