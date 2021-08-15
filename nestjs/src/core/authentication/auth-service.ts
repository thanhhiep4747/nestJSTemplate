/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, Injectable } from '@nestjs/common';
import { BcryptHelper } from 'src/common/helpers/bcrypt.helper';
import { CommonUsersService } from '../services/users/common-users-service';
import { TokenHelper } from '../../common/helpers/token.helper';
import { TOKEN_TYPE } from 'src/common/constants/tokenType.constant';
import { CustomThrowException } from 'src/common/exceptions/customThrowException';
import { LoginRequest } from 'src/common/models/dto/request/login.request';
import { UserInfoResponse } from 'src/common/models/dto/response/user-info.response';

@Injectable()
export class AuthService {
    // eslint-disable-next-line no-use-before-define
    constructor(
        private usersService: CommonUsersService,
        private bcryptHelper: BcryptHelper,
        private tokenHelper: TokenHelper
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUserForAuthentication(username);
        if (user && this.bcryptHelper.checkHash(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(request: LoginRequest): Promise<UserInfoResponse> {
        const user = await this.usersService.getUserForAuthentication(request.email);

        //await this.bcryptHelper.checkHash(request.password, user.password);

        const accessToken = this.tokenHelper.createToken({
            userId: user.userId,
            email: user.email,
            tokenType: TOKEN_TYPE.LOGIN
        });

        return new UserInfoResponse({
            accessToken,
            ...user
        });
    }

    async verifyToken(accessToken: string): Promise<UserInfoResponse> {
        const data = this.tokenHelper.verifyToken(accessToken);

        const user = await this.usersService.getUserForAuthentication(data.email);

        if (!user) {
            CustomThrowException('Invalid Credential', HttpStatus.UNAUTHORIZED);
        }

        return new UserInfoResponse({ ...user, accessToken });
    }
}
