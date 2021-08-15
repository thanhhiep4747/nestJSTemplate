import { Injectable } from '@nestjs/common';
import { User } from 'src/common/models/entities/user.entity';
import { BaseRepository } from 'src/core/config/database/base.repository';

@Injectable()
export class CommonUserRepository extends BaseRepository {
    getAll(): Promise<User[]> {
        return this.executeProcedureForSingleResultAsync('[dbo].[GetUsers]');
    }

    getOne(email: string): Promise<User> {
        return this.executeProcedureForSingleResultAsync('[dbo].[GetUserByEmail]', { email });
    }

    getDetail(email: string): Promise<User> {
        return this.executeProcedureForSingleResultAsync('[dbo].[Admin_GetUserDetail]', { email });
    }
}
