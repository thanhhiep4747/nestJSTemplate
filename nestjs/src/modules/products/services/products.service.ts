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
    sizes: any,
  ): Promise<any> {
    let newProductId;
    await this.productsRepository
      .insertProduct(name, price, inStock, images)
      .then((value) => {
        newProductId = value.recordset[0];
        let id = newProductId['Return Value'];
        sizes.map((s: any) => this.productsRepository.insertProductSize(id, s.size));
      });
    return newProductId;
  }

  async deleteProduct(id: number): Promise<any> {
    await this.productsRepository.deleteProductSizes(id);
    return this.productsRepository.deleteProduct(id);
  }

  async updateProduct(
    id: number,
    name: string,
    price: number,
    inStock: number,
    images: string,
    sizes: any,
  ) {
    await this.productsRepository.deleteProductSizes(id);
    if (sizes) {
      sizes.map((size: any) => this.productsRepository.insertProductSize(id, size.size));
    }
    return this.productsRepository.updateProduct(
      id,
      name,
      price,
      inStock,
      images,
    );
  }

  async getAllSizes() {
    let sizes;
    await this.productsRepository
      .getSizes()
      .then((value) => (sizes = value.recordset));
    return sizes;
  }
}
