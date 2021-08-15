import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBaseUserDto } from './create-base-user.dto';

export class UpdateBaseUserDto extends PartialType(CreateBaseUserDto) {
    @ApiProperty()
    @IsNotEmpty()
    userid?: string;
}
