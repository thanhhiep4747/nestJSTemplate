import internal from "stream";
import { ApiProperty } from '@nestjs/swagger';
export class product{
    @ApiProperty()
    name :string;
    @ApiProperty()
    price:number;
    @ApiProperty()
    img :string;
    @ApiProperty()
    detail :string;
    @ApiProperty()
    size:size[]
}
class size{    
    size:number;
    nop:number
}
// create table products(
//     pid int PRIMARY KEY,
//     pname nvarchar(200) not null,
//     pprice decimal(15,0) not null,
//     img nvarchar(200) not null,
//     detail nvarchar(1000) not null
    
//     )