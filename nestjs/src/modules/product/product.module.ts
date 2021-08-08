import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController]
})
export class ProductModule {}
