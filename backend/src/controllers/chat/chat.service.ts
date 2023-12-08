import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async getChat(id: string) {
    // Implemente a lógica para obter um chat pelo ID
    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: id,
      },
    });
    return chat;
  }

  async createChat(idRender: string, idDestinatario: string) {
    const chat = await this.prismaService.chat.create({
      data: {
        users: {
          connect: [{ id: idRender }, { id: idDestinatario }],
        },
      },
    });
    return chat;
  }

  async allChat(id: string) {
    const chat = await this.prismaService.chat.findMany({
      where: {
        users: {
          some: {
            id: id,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            role: true,
            status: true,
            email: true,
          },
        },
        mensagems: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return chat;
  }
}
