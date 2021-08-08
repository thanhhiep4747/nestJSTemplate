import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository){}

    getAllProducts(): Promise<any> {
        return this.productRepository.getAllProducts();
    }

    getProductById(id: number): Promise<any> {
        return this.productRepository.getProductById(id);
    }
}
