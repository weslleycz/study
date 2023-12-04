import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NextcloudService } from './services/nextcloud.service';
import { PrismaService } from './services/prisma.service';
import { UserController } from './controllers/user/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { JWTService } from './services/jwt.service';
import { UserService } from './controllers/user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    PrismaService,
    NextcloudService,
    JWTService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
