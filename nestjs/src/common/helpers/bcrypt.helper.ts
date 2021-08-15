import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHelper {
    saltRound = 10;

    async createHash(plain: string): Promise<string> {
        return await bcrypt.hash(plain, this.saltRound);
    }

    async checkHash(plain: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(plain, hash);
    }
}
