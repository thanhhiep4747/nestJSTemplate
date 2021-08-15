/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TOKEN_TYPE } from '../constants/tokenType.constant';
import { CustomThrowException } from '../exceptions/customThrowException';

@Injectable()
export class TokenHelper {
    secret = process.env.TOKEN_SECRET;

    createToken(data: Record<string, unknown>): any {
        try {
            const token = jwt.sign({ ...data, iat: Math.floor(Date.now() / 1000) }, this.secret);
            return token;
        } catch (error) {
            CustomThrowException('Invalid Credential', HttpStatus.UNAUTHORIZED);
        }
    }

    verifyToken(token: string, tokenType: string = TOKEN_TYPE.LOGIN): any {
        try {
            const data: any = jwt.verify(token, this.secret);
            if (data.tokenType === tokenType) {
                return data;
            }
            CustomThrowException('Invalid Credential', HttpStatus.UNAUTHORIZED);
        } catch (error) {
            CustomThrowException('Invalid Credential', HttpStatus.UNAUTHORIZED);
        }
    }
}
