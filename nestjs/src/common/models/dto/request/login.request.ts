import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginRequest {
    @ApiProperty()
    @IsEmail()
    @Transform(({ value }) => {
        return value.toLowerCase().trim();
    })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
