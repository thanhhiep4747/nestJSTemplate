import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class ForgotPasswordDto {
    @ApiProperty()
    @IsEmail()
    @Transform(({ value }) => {
        return value.toLowerCase().trim();
    })
    email: string;
}
