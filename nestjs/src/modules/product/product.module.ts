import { Module } from '@nestjs/common';
import { ProductController } from './controllers/Product.controller';
import { ProductRepository } from './repositories/Product.repository';
import { ProductService } from './services/Product.service';
@Module({
  imports: [],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}
