import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import {
  RoleInterceptor,
  RoleInterceptorDecorator,
} from 'src/middlewares/roles.middleware';
import { CourseCreateDTO } from './course.dto';
import { CourseService } from './course.service';
import { PrismaService } from 'src/services/prisma.service';
import { Response } from 'express';

@Controller('course')
@UseInterceptors(RoleInterceptor)
@UseFilters(HttpExceptionFilter)
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  @RoleInterceptorDecorator('Teacher')
  async createChat(@Body() data: CourseCreateDTO) {
    const { description, name, primary, secondary, image, token } = data;
    const course = await this.courseService.create({
      description,
      name,
      primary,
      secondary,
      image,
      token,
    });
    return course;
  }

  @Get('/byId/teacher/:id')
  @RoleInterceptorDecorator('Teacher')
  async getCourseByUserId(@Param('id') id: string) {
    return await this.courseService.getCourseByUserId(id);
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    try {
      const course = await this.prismaService.course.findUnique({
        where: {
          id,
        },
      });
      return course;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/cover/:id')
  async getCover(@Param('id') id: string, @Res() res: Response) {
    const cover = await this.courseService.getCover(id);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${id}-cover.jpg`,
    );
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(cover);
  }
}
