import { ProductsService } from './../services/products.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts() {
    let result
    await this.productsService.getProducts().then((value) => {
      result = value.recordset;
    });
    return result
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
      if (!productId){
          throw new NotFoundException
      }
      let result 
      await this.productsService.getProduct(Number(productId)).then(value => {
          result = value.recordset
      })
      if (result.length === 0)
        throw new NotFoundException
      return result
  }
}
