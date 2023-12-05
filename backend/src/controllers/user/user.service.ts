import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDTO } from './user.dto';
import { JWTService } from 'src/services/jwt.service';
import { Roles } from '@prisma/client';
import { BcryptService } from 'src/services/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jWTService: JWTService,
    private readonly bcryptService: BcryptService,
  ) {}
  async create({ email, name, password }: CreateUserDTO, role: Roles) {
    try {
      const cryptPassword = await this.bcryptService.hashPassword(password);
      const user = await this.prismaService.user.create({
        data: { email, name, password: cryptPassword, role },
      });
      return this.jWTService.login(user.id, user.role);
    } catch (error) {
      throw new HttpException('Email já registrado', 409);
    }
  }
}
