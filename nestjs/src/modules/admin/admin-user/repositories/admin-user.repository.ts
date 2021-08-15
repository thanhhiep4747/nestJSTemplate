import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/config/database/base.repository';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';
import { AdminUser } from '../entities/admin-user.entity';

@Injectable()
export class AdminUserRepository extends BaseRepository {
    getAll(): Promise<AdminUser[]> {
        return this.executeProcedureForSingleResultAsync('[dbo].[Admin_GetUsers]');
    }

    create(_createUserDto: CreateAdminUserDto): Promise<number> {
        return this.executeProcedureForSingleResultAsync('[dbo].[Admin_CreateUser]', _createUserDto);
    }

    async delete(email: string): Promise<boolean> {
        const result = await this.executeProcedureForSingleResultAsync<number>('[dbo].[Admin_DeleteUser]', {
            email
        });
        return result > 0;
    }

    async update(_updateUserDto: UpdateAdminUserDto): Promise<boolean> {
        const result = await this.executeProcedureForSingleResultAsync<number>(
            '[dbo].[Admin_UpdateUser]',
            _updateUserDto
        );

        return result > 0;
    }
}
