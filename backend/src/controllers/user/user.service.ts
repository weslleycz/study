import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDTO } from './user.dto';
import { JWTService } from 'src/services/jwt.service';
import { Roles } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jWTService: JWTService,
  ) {}
  async create({ email, name, password }: CreateUserDTO, role: Roles) {
    try {
      const user = await this.prismaService.user.create({
        data: { email, name, password, role },
      });
      return this.jWTService.login(user.id, user.role);
    } catch (error) {
      throw new HttpException('Email já registrado', 409);
    }
  }
}
