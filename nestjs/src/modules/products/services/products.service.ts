import { ProductsRepository } from './../repositories/products.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    if (!product) throw new NotFoundException();
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
        sizes.map((s) => this.productsRepository.insertProductSize(id, s));
      });
    return newProductId;
  }

  async deleteProduct(id: number) {
    await this.productsRepository.deleteProductSizes(id);
    return this.productsRepository.deleteProduct(id);
  }

  async updateProduct(
    id: number,
    name: string,
    price: number,
    inStock: number,
    images: string,
    sizes: string[],
  ) {
    await this.productsRepository.deleteProductSizes(id);
    if (sizes) {
      sizes.map((size) => this.productsRepository.insertProductSize(id, size));
    }
    return this.productsRepository.updateProduct(
      id,
      name,
      price,
      inStock,
      images,
    );
  }

}
