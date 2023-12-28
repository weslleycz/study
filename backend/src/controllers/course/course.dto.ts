import { IsNotEmpty } from 'class-validator';

export class CourseCreateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  primary: string;

  @IsNotEmpty()
  secondary: string;

  @IsNotEmpty()
  image: string;

  token?: string;
}
