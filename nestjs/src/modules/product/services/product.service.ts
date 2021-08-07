/* eslint-disable prettier/prettier */
import { Get, Injectable, Param, Res } from '@nestjs/common';
import { Product } from '../../shared/models/Product';

import { ProductRepository } from '../repositories/Product.repository';
@Injectable()
export class ProductService{
  getVersion(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  constructor(private productRepository: ProductRepository){

  }
  @Get()
  findAll(): any{
    return this.productRepository.findAll()
  }
  
  getProduct(id: string): any{
    return this.productRepository.getProduct(+id);
  }

  updateProduct(productId: number, productPrice: number, productTitle: string, productImage: string): any{
    return this.productRepository.updateProduct(productId, productPrice, productTitle, productImage)
  }

  updateProductSize(productId: number, sizeId: number): any{
    this.productRepository.updateProductSize(productId, sizeId)
  }

  removeProductSize(productId: number): any{
    this.productRepository.removeProductSize(productId)
  }
 
  insertProduct(productId: number, productPrice: number, productTitle: string, productImage: string): any{
    return this.productRepository.insertProduct(productId, productPrice, productTitle, productImage)
  }

  removeProduct(productId: number): any{
    return this.productRepository.removeProduct(productId);
  }
}
