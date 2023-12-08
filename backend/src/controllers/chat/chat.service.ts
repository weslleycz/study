import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async getChat(id: string) {
    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: id,
      },
    });
    return chat;
  }

  async createChat(idRender: string, idDestinatario: string) {
    const chats = await this.prismaService.chat.findMany({
      select: {
        users: true,
      },
    });
    const filteredChats = chats.filter((chat: any) => {
      if (
        (chat.users[0].id === idRender &&
          chat.users[1].id === idDestinatario) ||
        (chat.users[1].id === idRender && chat.users[0].id === idDestinatario)
      ) {
        return true;
      }
    });
    if (filteredChats.length === 0) {
      const chat = await this.prismaService.chat.create({
        data: {
          users: [{ id: idRender }, { id: idDestinatario }],
        },
      });
      return chat;
    }
  }

  async allChat(id: string) {
    const chats = await this.prismaService.chat.findMany({
      include: {
        mensagems: {
          orderBy: {
            order: 'asc',
          },
          select: {
            status: true,
            userId: true,
            user: true,
          },
        },
      },
    });
    const filteredChats = await Promise.all(
      chats
        .filter((chat) => {
          return chat.users.some((user: any) => user.id === id);
        })
        .map(async (chat: any) => {
          const users = await this.prismaService.user.findMany({
            where: {
              id: {
                in: chat.users.map((user: any) => user.id),
              },
            },
          });
          chat.users = users;
          return chat;
        }),
    );
    return filteredChats;
  }
}
