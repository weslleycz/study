import { Injectable } from '@nestjs/common';
import { sign, verify, decode, Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Roles } from '@prisma/client';

dotenv.config();

@Injectable()
export class JWTService {
  private secretKey: Secret;

  constructor() {
    this.secretKey = process.env.Security_JWT;
  }

  public login(id: string, permissions: Roles): string {
    const payload = { data: id, permissions };
    return sign(payload, this.secretKey, { expiresIn: '72h' });
  }

  public verify(token: string): boolean {
    try {
      verify(token, this.secretKey);
      return true;
    } catch (err) {
      return false;
    }
  }

  public decode(token: string) {
    return decode(token);
  }
}
