import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../create-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { UpdateProductDto } from '../update-product.dto';
@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository){}

    getAllProducts(): Promise<any> {
        return this.productRepository.getAllProducts();
    }

    getProductById(id: number): Promise<any> {
        return this.productRepository.getProductById(id);
    }

    getProductSizes(id: number): Promise<any> {
        return this.productRepository.getProductSizes(id);
      }

    createProduct(productDto: CreateProductDto): Promise<any> {
        return this.productRepository.createProduct(productDto);
    }

    updateProduct(id: number, productDto: UpdateProductDto): Promise<any> {
        return this.productRepository.updateProduct(id, productDto);
    }

    deleteProduct(id: number): Promise<any> {
        return this.productRepository.deleteProduct(id);
    }
    
    getSizeTable(): Promise<any> {
        return this.productRepository.getSizeTable();
    }

    getCategoryTable(): Promise<any> {
        return this.productRepository.getCategoryTable();
    }
}
