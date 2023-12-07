import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.use(bodyParser.json({ limit: '1024mb' }));
  app.use(bodyParser.urlencoded({ limit: '1024mb', extended: true }));
  dotenv.config();
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization,token',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsOptions);
  await app.listen(process.env.PORT);
}
bootstrap();
