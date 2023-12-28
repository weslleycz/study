import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '@prisma/client';
import { Observable } from 'rxjs';
import { JWTService } from 'src/services/jwt.service';
import { IJWT } from 'src/types/jwt';
import { Request } from 'express';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(
    @Inject('String') private readonly role: string,
    private readonly jWTService: JWTService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest() as Request;
    if (!this.role) {
      return next.handle();
    }
    const headers = request.headers;
    const jwt = headers.token;
    if (!jwt) {
      throw new HttpException('Token não fornecido', HttpStatus.UNAUTHORIZED);
    }
    const data = <IJWT>this.jWTService.decode(jwt as string);
    if (data.permissions != this.role) {
      throw new HttpException('Permissão negada', HttpStatus.UNAUTHORIZED);
    }
    request.body.token = data.data;
    return next.handle();
  }
}

const jWTService = new JWTService();

export const RoleInterceptorDecorator = (role?: Roles) =>
  UseInterceptors(new RoleInterceptor(role, jWTService));
