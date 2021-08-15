/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CommonUsersService } from 'src/core/services/users/common-users-service';
import { METADATA } from 'src/common/constants/api-metadata.const';
import { CustomThrowException } from 'src/common/exceptions/customThrowException';
import { Permission } from '../enums/permission.enum';
import { Request } from 'express';
import { CustomRequest } from '../interfaces/customRequest.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: CommonUsersService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(METADATA.IS_PUBLIC, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            CustomThrowException('UnAuthorized', HttpStatus.UNAUTHORIZED);
        }

        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(METADATA.PERMISSION, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredPermissions) {
            return true;
        }
    }

    private async _handleRequest(request: Request, requiredPermissions: Permission[]): Promise<boolean> {
        const { user } = request as any;
        const userIdentity = await this.userService.findUserDetail(user.email);

        const havePermission: boolean = requiredPermissions.some((permission) => {
            return userIdentity.permissions?.includes(permission);
        });

        if (!havePermission) {
            CustomThrowException('Permission denied', HttpStatus.FORBIDDEN);
        }

        (request as CustomRequest).userIdentity = userIdentity;

        return true;
    }
}
