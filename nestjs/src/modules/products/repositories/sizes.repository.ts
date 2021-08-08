import { UpdateSizeDto } from './../dto/update-size.dto';
import { UpdateProductDto } from './../dto/update-product.dto';
import { CreateProductDto } from './../dto/create-product.dto';
import { Product } from '../entities/product.entity';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/base.repository';
import { Size } from '../entities/size.entity';
import { CreateSizeDto } from '../dto/create-size.dto';

@Injectable()
export class SizesRepository extends BaseRepository {
  getAllSizes(): Promise<Size[]> {
    return this.executeProcedureForListResultAsync('spGetAllSizes');
  }

  createSize(createSizeDto: CreateSizeDto): Promise<Size> {
    return this.executeProcedureForSingleResultAsync(
      'spCreateSize',
      createSizeDto,
    );
  }

  updateSizeById(
    sizeId: string,
    updateSizeDto: UpdateSizeDto,
  ): Promise<boolean> {
    return this.executeProcedureForSingleResultAsync('spUpdateSizeById', {
      sizeId,
      ...updateSizeDto,
    });
  }

  deleteSizeBySizeId(sizeId: string): Promise<boolean> {
    return this.executeProcedureForSingleResultAsync('spDeleteSizeBySizeId', {
      sizeId,
    });
  }
}
