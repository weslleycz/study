import {
  Body,
  Controller,
  Post,
  UseFilters,
  Query,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CreateUserDTO, LoginUserDTO } from './user.dto';
import { UserService } from './user.service';
import { Roles } from '@prisma/client';
import { Response } from 'express';
import { JWTService } from 'src/services/jwt.service';
import { create, Whatsapp } from 'venom-bot';



@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jWTService: JWTService,
  ) {}
  @Post()
  async createUser(@Body() data: CreateUserDTO, @Query('role') role: Roles) {
    return await this.userService.create(data, role);
  }

  @Post('/login')
  async login(@Body() data: LoginUserDTO) {
    return await this.userService.login(data);
  }

  @Get(':id')
  async findFirst(@Param('id') id: string) {
    const token = await this.jWTService.decode(id);
    return await this.userService.findFirst(token.data);
  }

  @Get('/byId/:id')
  async findFirstById(@Param('id') id: string) {
    return await this.userService.findFirst(id);
  }

  @Get('/avatar/:id')
  async getAvatar(@Param('id') id: string, @Res() res: Response) {
    const avatar = await this.userService.getAvatar(id);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${id}-avatar.jpg`,
    );
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(avatar);
  }

  @Post('/upload/:id')
  async upload(@Body() data: any, @Param('id') id: string) {
    if (typeof data?.data !== 'string') {
      throw new Error('Os dados devem ser uma string base64 válida');
    }
    const file = Buffer.from(data?.data, 'base64');
    return await this.userService.upload(file, id);
  }

  @Get()
  async teste() {

  }
}
