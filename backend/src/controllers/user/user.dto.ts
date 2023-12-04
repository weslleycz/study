import { IsEmail, IsNotEmpty, Matches, Validate } from 'class-validator';
import { IsPasswordStrongConstraint } from 'src/decorators/IsPasswordStrongConstraint.decorator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'A senha deve ser forte: pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais',
    },
  )
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @Validate(IsPasswordStrongConstraint)
  password: string;
}
