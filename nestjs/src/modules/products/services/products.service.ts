import { ProductsRepository } from './../repositories/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts() {
    let products;
    await this.productsRepository
      .getProducts()
      .then((value) => (products = value.recordset));
    return products;
  }

  async getProduct(id: number): Promise<any> {
    let product;
    const sizes = await this.getProductSizes(id);
    await this.productsRepository
      .getProduct(id)
      .then((value) => (product = value.recordset[0]));
    return { ...product, sizes: sizes };
  }

  async getProductSizes(id: number) {
    let productSizes;
    await this.productsRepository
      .getProductSizes(id)
      .then((value) => (productSizes = value.recordset));
    return productSizes;
  }

  async insertProduct(
    name: string,
    price: number,
    inStock: number,
    images: string,
    sizes: string[],
  ): Promise<any> {
    let newProductId;
    await this.productsRepository
      .insertProduct(name, price, inStock, images)
      .then((value) => {
        newProductId = value.recordset[0];
        let id = newProductId['Return Value'];
        sizes.map((s) => this.insertProductSize(id, s));
      });
    return newProductId;
  }

  async insertProductSize(id: number, size: string) {
    return this.productsRepository.insertProductSize(id, size);
  }

  
}
