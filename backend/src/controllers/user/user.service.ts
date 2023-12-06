import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDTO, LoginUserDTO } from './user.dto';
import { JWTService } from 'src/services/jwt.service';
import { Roles } from '@prisma/client';
import { BcryptService } from 'src/services/bcrypt.service';
import { NextcloudService } from 'src/services/nextcloud.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jWTService: JWTService,
    private readonly bcryptService: BcryptService,
    private readonly nextcloudService: NextcloudService,
  ) {}
  async create({ email, name, password }: CreateUserDTO, role: Roles) {
    try {
      const cryptPassword = await this.bcryptService.hashPassword(password);
      const user = await this.prismaService.user.create({
        data: { email, name, password: cryptPassword, role },
      });
      await this.nextcloudService.createFolder(user.id);
      return this.jWTService.login(user.id, user.role);
    } catch (error) {
      throw new HttpException('Email já registrado', 409);
    }
  }

  async login({ email, password }: LoginUserDTO) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new HttpException('Usuário ou senha inválidos', 401);
      }
      const isPasswordValid = await this.bcryptService.comparePasswords(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Usuário ou senha inválidos', 401);
      }
      return this.jWTService.login(user.id, user.role);
    } catch (error) {
      throw new HttpException('Usuário ou senha inválidos', 401);
    }
  }

  async findFirst(id: string) {
    const token = await this.jWTService.decode(id);
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id: token.data },
        select: {
          email: true,
          id: true,
          name: true,
          role: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('Usuário inválido', 401);
    }
  }

  async getAvatar(id: string) {
    try {
      return await this.nextcloudService.getFile({
        fileBaseName: 'avatar.jpg',
        folderName: id,
      });
    } catch (error) {
      throw new HttpException('Avatar não encontrado', 400);
    }
  }

  async upload(data: Buffer, id: string) {
    return await this.nextcloudService.upload({
      data,
      fileBaseName: 'avatar.jpg',
      folderName: id,
    });
  }
}
