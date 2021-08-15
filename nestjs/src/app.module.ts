import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { adminModules, defaultModules } from './common/constants/imports.modules';
import { BcryptHelper } from './common/helpers/bcrypt.helper';
import { TokenHelper } from './common/helpers/token.helper';
import { AuthenticationMiddleware } from './common/middlewares/authentication.middleware';
import { BodyParserMiddleware } from './common/middlewares/body-parser.middleware';
import { AuthService } from './core/authentication/auth-service';
import { CommonUserRepository } from './core/repositories/users/common-user-reposity';
import { JobsService } from './core/services/job/jobs.service';
import { CommonUsersService } from './core/services/users/common-users-service';
import { SampleModule } from './modules/sample/sample.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: ['.env']
        }),
        SampleModule,
        ...adminModules,
        ...defaultModules
    ],
    controllers: [AppController],
    providers: [AppService, JobsService, AuthService, CommonUsersService, CommonUserRepository, BcryptHelper, TokenHelper]
})
export class AppModule implements NestModule {
    async configure(consumer: MiddlewareConsumer): Promise<void> {
        consumer
            .apply(await BodyParserMiddleware)
            .forRoutes('*')
            .apply(await AuthenticationMiddleware)
            .forRoutes('*');
    }
}
