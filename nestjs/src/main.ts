import { NestFactory, Reflector } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AuthorizationGuard } from './common/guards/authorization.guards';
import { CommonUsersService } from './core/services/users/common-users-service';
import { AllExceptionsFilter } from './common/exceptions/allExceptionsFilter ';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, { cors: true });

    app.setGlobalPrefix('api');
    app.use(helmet());
    app.use(csurf());

    const config = new DocumentBuilder()
        .setTitle(process.env.APP_Name)
        .setDescription('')
        .setVersion(process.env.APP_VERSION)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);

    app.useGlobalFilters(new AllExceptionsFilter());

    const userService = app.select(AppModule).get(CommonUsersService);
    app.useGlobalGuards(new AuthorizationGuard(new Reflector(), userService));

    await app.listen(process.env.PORT);
}
bootstrap();
