/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class Product {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  size?: any[];
}
// 