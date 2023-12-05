import { Controller, Get } from '@nestjs/common';
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
  async getHello() {
    // await this.nextcloudService.upload({
    //   data: Buffer.from('My file content'),
    //   fileBaseName: 'teste2.txt',
    //   folderName: 'teste',
    // });
    // await this.nextcloudService.delete({
    //   fileBaseName: 'teste.txt',
    //   folderName: 'teste',
    // });
    // return await this.nextcloudService.getFile({
    //   fileBaseName: 'teste.txt',
    //   folderName: 'teste',
    // });
    return this.appService.getHello();
  }
}
