import { Controller, Delete, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/services/prisma.service';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async stream(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.flushHeaders();
    await this.prismaService.user.update({
      where: {
        id: req.query.id as string,
      },
      data: {
        status: 'Online',
      },
    });
    const interval = setInterval(async () => {
      const notifications = await this.notificationsService.getNotification(
        req.query.id as string,
      );
      res.write(`data: ${JSON.stringify(notifications)}\n\n`);
    }, 1000);

    res.on('close', async () => {
      await this.prismaService.user.update({
        where: {
          id: req.query.id as string,
        },
        data: {
          status: 'Offline',
        },
      });
      clearInterval(interval);
      res.end();
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.notificationsService.delete(id);
  }
}
