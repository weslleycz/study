import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}

  async getNotification(id: string) {
    try {
      if ((await this.redisService.getValue(id)) !== null) {
        const notification = await this.redisService.getValue(
          `notifications${id}`,
        );
        return JSON.parse(notification);
      } else {
        const notifications = await this.prismaService.notification.findMany({
          where: {
            id,
          },
        });
        await this.redisService.setValue(
          `notifications${id}`,
          JSON.stringify(notifications),
        );
        return notifications;
      }
    } catch (error) {
      console.log(error);
    }
  }
}