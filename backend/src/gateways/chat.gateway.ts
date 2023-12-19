import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/services/prisma.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly prismaService: PrismaService) {}

  handleConnection(client: Socket, data: any, ...args: any[]) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    if (payload.message === undefined) {
      await this.prismaService.mensagem.updateMany({
        where: {
          chatId: payload.chatId,
          userId: {
            not: payload.userId,
          },
        },
        data: {
          status: 'read',
        },
      });
      const chat = await this.prismaService.chat.findFirst({
        where: {
          id: payload.chatId,
        },
        include: {
          mensagems: {
            include: {
              user: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      this.server.emit('message', chat);
    } else {
      await this.prismaService.mensagem.updateMany({
        where: {
          chatId: payload.chatId,
          userId: {
            not: payload.userId,
          },
        },
        data: {
          status: 'read',
        },
      });
      const chat = await this.prismaService.chat.findFirst({
        where: {
          id: payload.chatId,
        },
        include: {
          mensagems: {
            include: {
              user: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      await this.prismaService.mensagem.create({
        data: {
          order: chat.mensagems.length,
          chatId: payload.chatId,
          status: 'unread',
          text: payload.message,
          userId: payload.userId,
        },
      });
      const getChat = await this.prismaService.chat.findFirst({
        where: {
          id: payload.chatId,
        },
        include: {
          mensagems: {
            include: {
              user: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      this.server.emit('message', getChat);
    }
  }
}
