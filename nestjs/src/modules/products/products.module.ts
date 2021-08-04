import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [],
})
export class ProductsModule {}
