import { IsNotEmpty } from 'class-validator';

export class ChatCreateDTO {
  @IsNotEmpty()
  idRender: string;

  @IsNotEmpty()
  idDestinatario: string;
}
