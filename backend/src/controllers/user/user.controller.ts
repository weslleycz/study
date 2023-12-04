import { Body, Controller, Post, UseFilters, Query } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CreateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { Roles } from '@prisma/client';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() data: CreateUserDTO, @Query('role') role: Roles) {
    return this.userService.create(data, role);
  }
}
