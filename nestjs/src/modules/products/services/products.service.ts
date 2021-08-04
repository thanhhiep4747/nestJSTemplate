import { ProductsRepository } from './../repositories/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(): Promise<any> {
      return this.productsRepository.getProducts()
  }

  getProduct(id: number): Promise<any> {
      return this.productsRepository.getProduct(id)
  }
}
