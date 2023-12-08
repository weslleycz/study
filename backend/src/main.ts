import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Server } from 'socket.io';

class SocketIoAdapter extends IoAdapter {
  private readonly server: Server;

  constructor(app) {
    super(app);

    this.server = new Server(app.getHttpServer(), {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
  }

  createIOServer(port: number, options?: any): any {
    return this.server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bodyParser: false,
  });

  dotenv.config();

  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,token',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(process.env.PORT);

  console.log(`Aplicação está rodando na porta ${process.env.PORT}`);
}
bootstrap();
