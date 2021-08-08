import { SizesRepository } from './repositories/sizes.repository';
import { SizesController } from './controllers/sizes.controller';
import { ProductsRepository } from './repositories/products.repository';
import { Module } from '@nestjs/common';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controllers/products.controller';
import { SizesService } from './service/sizes.service';

@Module({
  controllers: [ProductsController, SizesController],
  providers: [
    ProductsService,
    SizesService,
    ProductsRepository,
    SizesRepository,
  ],
})
export class ProductsModule {}
