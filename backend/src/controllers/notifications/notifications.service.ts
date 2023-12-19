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
      const notifications = await this.prismaService.notification.findMany({
        where: {
          userId: id,
        },
      });
      return notifications;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: string) {
    const notification = await this.prismaService.notification.delete({
      where: {
        id,
      },
    });
    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId: notification.userId,
      },
    });
    return notifications;
  }
}
