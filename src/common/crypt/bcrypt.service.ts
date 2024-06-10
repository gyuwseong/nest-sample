import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  async compare(plain: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plain, encrypted);
  }

  async generateHash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 5);
  }
}
