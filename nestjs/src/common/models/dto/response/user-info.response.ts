import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserInfoResponse {
    @ApiProperty()
    @IsNotEmpty()
    accessToken?: string;

    @ApiProperty()
    @IsNotEmpty()
    userId?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsNotEmpty()
    fullName: string;

    constructor(partial: Partial<UserInfoResponse>) {
        Object.assign(this, partial);
    }
}
