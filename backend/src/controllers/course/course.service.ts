import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CourseCreateDTO } from './course.dto';
import { NextcloudService } from 'src/services/nextcloud.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly nextcloudService: NextcloudService,
  ) {}
  async create({
    description,
    name,
    primary,
    secondary,
    image,
    token,
  }: CourseCreateDTO) {
    try {
      const course = await this.prismaService.course.create({
        data: {
          description,
          name,
          primary,
          secondary,
          userId: token,
        },
      });
      const data = image as any;
      if (typeof data !== 'string') {
        throw new Error('Os dados devem ser uma string base64 válida');
      }
      const base64String = data.split(';base64,').pop();

      if (!base64String) {
        throw new Error('Formato de string base64 inválido');
      }

      const file = Buffer.from(base64String, 'base64') as any;

      await this.nextcloudService.upload({
        data: file,
        folderName: `/courses/${course.id}`,
        fileBaseName: 'cover.jpg',
      });
      return course;
    } catch (error) {
      console.log(error);
      throw new HttpException('Não foi possível criar o curso', 400);
    }
  }

  async getCourseByUserId(id: string) {
    const courses = await this.prismaService.course.findMany({
      where: {
        userId: id,
      },
      include: {
        Enrollment: true,
        lessons: true,
      },
    });
    return courses;
  }

  async getCover(id: string) {
    return await this.nextcloudService.getFile({
      fileBaseName: 'cover.jpg',
      folderName: `/courses/${id}`,
    });
  }
}
