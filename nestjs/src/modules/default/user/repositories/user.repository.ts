import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/config/database/base.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository extends BaseRepository {
    create(_createUserDto: CreateUserDto): Promise<number> {
        return this.executeProcedureForSingleResultAsync('[dbo].[CreateUser]', _createUserDto);
    }

    async delete(email: string): Promise<boolean> {
        const result = await this.executeProcedureForSingleResultAsync<number>('[dbo].[DeleteUser]', {
            email
        });
        return result > 0;
    }

    async update(_updateUserDto: UpdateUserDto): Promise<boolean> {
        const result = await this.executeProcedureForSingleResultAsync<number>('[dbo].[UpdateUser]', _updateUserDto);

        return result > 0;
    }
}
