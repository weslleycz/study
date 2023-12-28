import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { NextcloudService } from './services/nextcloud.service';
import { RedisService } from './services/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly nextcloudService: NextcloudService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  @Render('index')
  async getHello() {
    return { message: 'Hello World!', status: 200 };
  }
}
