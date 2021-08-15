import { Module } from '@nestjs/common';
import { AdminUserService } from './services/admin-user.service';
import { AdminUserController } from './controller/admin-user.controller';
import { AdminUserRepository } from './repositories/admin-user.repository';

@Module({
    controllers: [AdminUserController],
    providers: [AdminUserService, AdminUserRepository]
})
export class AdminUserModule {}
