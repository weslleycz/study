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
import { BcryptService } from './services/bcrypt.service';
import { RedisService } from './services/redis.service';
import { NotificationsController } from './controllers/notifications/notifications.controller';
import { NotificationsService } from './controllers/notifications/notifications.service';
import { ChatController } from './controllers/chat/chat.controller';
import { ChatService } from './controllers/chat/chat.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    NotificationsController,
    ChatController,
  ],
  providers: [
    AppService,
    PrismaService,
    NextcloudService,
    JWTService,
    UserService,
    RedisService,
    BcryptService,
    ChatService,
    NotificationsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
