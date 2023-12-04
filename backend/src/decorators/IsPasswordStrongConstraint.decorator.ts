import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as crypto from 'crypto';
import * as axios from 'axios';

@ValidatorConstraint({ name: 'isPasswordStrong', async: true })
export class IsPasswordStrongConstraint
  implements ValidatorConstraintInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(password: string, _args: ValidationArguments) {
    // Calcular o hash SHA-1 da senha
    const sha1Hash = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex')
      .toUpperCase();

    // Separar os cinco primeiros caracteres do hash e o restante
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.substring(5);

    // Enviar os cinco primeiros caracteres para a API do Have I Been Pwned
    const url = `https://api.pwnedpasswords.com/range/${prefix}`;
    const response = await axios.default.get(url);

    // Verificar se o restante do hash está na lista de sufixos comprometidos
    const suffixes = response.data
      .split('\n')
      .map((line: string) => line.split(':')[0]);
    return !suffixes.includes(suffix);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'A senha foi comprometida. Escolha uma senha mais segura.';
  }
}
