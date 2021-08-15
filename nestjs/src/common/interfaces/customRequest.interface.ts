import { Request } from 'express';
import { User } from '../models/entities/user.entity';

export interface CustomRequest extends Request {
    userIdentity: User;
}
