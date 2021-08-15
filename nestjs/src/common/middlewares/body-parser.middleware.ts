import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';

@Injectable()
export class BodyParserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        json()(req, res, next);
    }
}
