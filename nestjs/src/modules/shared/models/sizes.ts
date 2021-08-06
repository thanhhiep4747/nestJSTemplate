import { ApiProperty } from '@nestjs/swagger';
export class product_size{
    @ApiProperty()
    pid:number;
    @ApiProperty()
    size:[]
}