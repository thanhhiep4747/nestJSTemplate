/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extra-parens */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenHelper } from '../helpers/token.helper';
import { User } from '../models/entities/user.entity';

interface AuthRequest extends Request {
    user?: Partial<User>;
}

export const getTokenFromRequest = (req: Request): string => {
    const authHeaders = req.headers;
    if (!authHeaders.authorization) {
        return '';
    }

    const authorizationKeys = authHeaders.authorization.split(' ');
    if (authorizationKeys.length < 2) {
        return '';
    }

    if (authorizationKeys[0] !== process.env.TOKEN_TYPE) {
        return '';
    }

    return authorizationKeys[1];
};

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private readonly tokenHelper: TokenHelper) {}
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        const tokenString = getTokenFromRequest(req);

        if (!tokenString || tokenString === 'null') {
            return next();
        }

        const token = await this.tokenHelper.verifyToken(tokenString);

        (req as AuthRequest).user = token;

        next();
    }
}
