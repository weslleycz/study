import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NextcloudService } from './services/nextcloud.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, NextcloudService],
})
export class AppModule {}
