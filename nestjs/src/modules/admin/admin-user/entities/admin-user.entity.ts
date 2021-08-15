import { PartialType } from '@nestjs/swagger';
import { User } from 'src/common/models/entities/user.entity';

export class AdminUser extends PartialType(User) {}
