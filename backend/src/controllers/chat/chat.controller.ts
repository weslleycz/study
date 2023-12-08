import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ChatCreateDTO } from './chat.dto';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async createChat(@Body() data: ChatCreateDTO) {
    const { idDestinatario, idRender } = data;
    const chat = await this.chatService.createChat(idRender, idDestinatario);
    return chat;
  }

  @Get(':id')
  async allChat(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.flushHeaders();
    const interval = setInterval(async () => {
      const chat = await this.chatService.allChat(req.params.id as string);
      res.write(`data: ${JSON.stringify(chat)}\n\n`);
    }, 1000);

    res.on('close', async () => {
      clearInterval(interval);
      res.end();
    });
  }
}
