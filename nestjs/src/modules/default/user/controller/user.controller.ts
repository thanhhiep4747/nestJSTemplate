import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LoginRequest } from 'src/common/models/dto/request/login.request';
import { VerifyTokenRequest } from 'src/common/models/dto/request/verify-token.request';
import { UserInfoResponse } from 'src/common/models/dto/response/user-info.response';
import { AuthService } from 'src/core/authentication/auth-service';
import { Public } from 'src/core/decorators/guards/public.guards.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Public()
    @Post('login')
    login(@Body() loginRequest: LoginRequest): Promise<UserInfoResponse> {
        return this.authService.login(loginRequest);
    }

    @Public()
    @Post('verify-token')
    verifyToken(@Body() model: VerifyTokenRequest): Promise<UserInfoResponse> {
        return this.authService.verifyToken(model.token);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
