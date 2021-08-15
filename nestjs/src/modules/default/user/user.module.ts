import { Module } from '@nestjs/common';
import { BcryptHelper } from 'src/common/helpers/bcrypt.helper';
import { TokenHelper } from 'src/common/helpers/token.helper';
import { AuthService } from 'src/core/authentication/auth-service';
import { CommonUserRepository } from 'src/core/repositories/users/common-user-reposity';
import { CommonUsersService } from 'src/core/services/users/common-users-service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
    controllers: [UserController],
    providers: [AuthService, UserService, UserRepository, BcryptHelper, TokenHelper, CommonUsersService, CommonUserRepository]
})
export class UserModule {}
