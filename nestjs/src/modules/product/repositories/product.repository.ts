/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/base.repository';
import { Product } from '../../shared/models/Product';

@Injectable()
export class ProductRepository extends BaseRepository {
  getVersion(): Promise<any> {
    return this.queryAsync('SELECT @@Version');
  }

  
  findAll(): Promise<Product[]>{
    return this.queryAsync('exec [dbo].[spProductList]');
  }

  getProduct(id: number): any{
    return this.queryAsync(`exec [dbo].[spProductWithSize] ${id}`);
  }

  updateProduct(productId: number, productPrice: number, productTitle: string, productImage: string): any{
    return this.queryAsync(`exec [dbo].[spUpdateProduct] ${productId}, ${productPrice}, N'${productTitle}', N'${productImage}'`);
  }

  updateProductSize(productId: number, sizeId: number): any{
    return this.queryAsync(`exec [dbo].[spUpdateProductSize] ${productId}, ${sizeId}`)
  }

  removeProductSize(productId: number): any{
    return this.queryAsync(`exec [dbo].[spRemoveSize] ${productId}`);
  }

  insertProduct(productId: number, productPrice: number, productTitle: string, productImage: string): any{
    return this.queryAsync(`exec [dbo].[spInsertProduct] ${productId}, ${productPrice}, N'${productTitle}', N'${productImage}'`);
  }

  removeProduct(productId: number): any{
    return this.queryAsync(`exec [dbo].[spRemoveProduct] ${productId}`);
  }

}
