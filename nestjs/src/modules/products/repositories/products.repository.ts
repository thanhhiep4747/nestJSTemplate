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
export class ProductsRepository extends BaseRepository {
  getVersion(): Promise<any> {
    return this.queryAsync('SELECT @@Version');
  }

  getAllProducts(): Promise<Product[]> {
    return this.executeProcedureForListResultAsync('spGetAllProducts');
  }

  getProductById(proId: string): Promise<Product> {
    return this.executeProcedureForSingleResultAsync('spGetProductById', {
      proId,
    });
  }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.executeProcedureForSingleResultAsync(
      'spCreateProduct',
      createProductDto,
    );
  }

  updateProductById(
    proId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<boolean> {
    return this.executeProcedureForSingleResultAsync('spUpdateProductById', {
      proId,
      ...updateProductDto,
    });
  }

  deleteProductById(proId: string): Promise<boolean> {
    return this.executeProcedureForSingleResultAsync('spDeleteProductById', {
      proId,
    });
  }

  getSizesOfProductByProId(proId: string): Promise<Size[]> {
    return this.executeProcedureForListResultAsync(
      'spGetSizesOfProductByProId',
      { proId },
    );
  }

  createSizeOfProduct(proId: string, sizeId: string): Promise<boolean> {
    return this.executeProcedureForSingleResultAsync('spCreateSizeOfProduct', {
      proId,
      sizeId,
    });
  }

  deleteSizesOfProductByProId(proId: string): Promise<boolean> {
    return this.executeProcedureForSingleResultAsync(
      'spDeleteSizesOfProductByProId',
      { proId },
    );
  }
}
