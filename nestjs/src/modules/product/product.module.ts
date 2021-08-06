import { Module } from '@nestjs/common';
// import { SampleController } from './controllers/sample.controller';
// import { SampleJob } from './jobs/sample.job';
// import { SampleRepository } from './repositories/sample.repository';

import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repositories';
import { AddproductController } from './controllers/addproduct.controller';
import {ProductController} from './controllers/product.controller'
@Module({
    imports: [
        
    ],
    providers: [
        ProductService,
        ProductRepository
    ],
    controllers: [
        AddproductController,
        ProductController
    ],
    exports: [

    ]
  })
  export class ProductModule { }