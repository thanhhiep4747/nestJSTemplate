import { SizesRepository } from './../repositories/sizes.repository';
import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from '../dto/create-size.dto';
import { Size } from '../entities/size.entity';
import { UpdateSizeDto } from '../dto/update-size.dto';

@Injectable()
export class SizesService {
  constructor(private sizesRepository: SizesRepository) {}

  getAllSizes() {
    return this.sizesRepository.getAllSizes();
  }

  createSize(createSizeDto: CreateSizeDto) {
    return this.sizesRepository.createSize(createSizeDto);
  }

  updateSizeById(sizeId: string, updateSizeDto: UpdateSizeDto) {
    return this.sizesRepository.updateSizeById(sizeId, updateSizeDto);
  }

  deleteSizeBySizeId(sizeId: string): Promise<boolean> {
    return this.sizesRepository.deleteSizeBySizeId(sizeId);
  }
}
