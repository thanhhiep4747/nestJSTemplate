import { CreateProduct } from './../model/createProduct.model';
import { Product } from './../entities/product.entity';
import { ProductsRepository } from './../repositories/products.repository';
import { Injectable, Delete } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateSizeDto } from '../dto/create-size.dto';
import { Size } from '../entities/size.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getAllProducts() {
    let products = await this.productsRepository.getAllProducts();
    return await Promise.all(
      products.map(async (product) => {
        let sizes = await this.productsRepository.getSizesOfProductByProId(
          product.proId,
        );
        return { ...product, sizes };
      }),
    );
  }

  async getProductById(proId: string) {
    let product = await this.productsRepository.getProductById(proId);
    let sizes = await this.productsRepository.getSizesOfProductByProId(proId);
    return { ...product, sizes };
  }

  async createProduct(createProduct: CreateProduct) {
    const createProductDto = {
      ...createProduct,
    };
    let product = await this.productsRepository.createProduct(createProductDto);
    let sizes = await this.createAllSizesOfProduct(
      product.proId,
      createProduct.sizeIds,
    );
    return { ...product, sizes };
  }

  updateProductById(proId: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.updateProductById(proId, updateProductDto);
  }

  async deleteProductById(proId: string) {
    await this.productsRepository.deleteSizesOfProductByProId(proId);
    return await this.productsRepository.deleteProductById(proId);
  }

  getSizesOfProductByProId(proId: string) {
    return this.productsRepository.getSizesOfProductByProId(proId);
  }

  async createAllSizesOfProduct(proId: string, sizeIds: string[]) {
    return await Promise.all(
      sizeIds.map(
        async (sizeId) =>
          await this.productsRepository.createSizeOfProduct(proId, sizeId),
      ),
    );
  }
}
