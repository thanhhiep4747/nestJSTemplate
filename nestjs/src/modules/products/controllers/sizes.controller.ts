import { UpdateSizeDto } from './../dto/update-size.dto';
import { CreateSizeDto } from './../dto/create-size.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SizesService } from '../service/sizes.service';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}
  @Get()
  async getAllSizes() {
    return await this.sizesService.getAllSizes();
  }

  @Post()
  async createSize(@Body() createSizeDto: CreateSizeDto) {
    return await this.sizesService.createSize(createSizeDto);
  }

  @Put(':sizeId')
  updateSizeById(
    @Param('sizeId') sizeId: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizesService.updateSizeById(sizeId, updateSizeDto);
  }

  @Delete(':sizeId')
  deleteSizeBySizeId(@Param('sizeId') sizeId: string): Promise<boolean> {
    return this.sizesService.deleteSizeBySizeId(sizeId);
  }
}
