import { ProductsService } from './../services/products.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpStatus,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    if (!Number(productId)) throw new NotFoundException();
    return this.productsService.getProduct(Number(productId));
  }

  @Post()
  async insertProduct(
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('in_stock') inStock: string,
    @Body('images') images: string,
    @Body('sizes') sizes: string[],
    @Res() res: Response,
  ) {
    if (!name || !price || !inStock || !images || !sizes) {
      return res.status(HttpStatus.BAD_REQUEST).send('Bad request');
    }
    const newProductId = await this.productsService.insertProduct(
      name,
      Number(price),
      Number(inStock),
      images,
      sizes,
    );
    return res.status(HttpStatus.CREATED).send(newProductId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('in_stock') inStock: string,
    @Body('images') images: string,
    @Body('sizes') sizes: string[],
    @Res() res: Response,
  ) {
    await this.productsService.updateProduct(
      Number(id),
      name,
      Number(price),
      Number(inStock),
      images,
      sizes,
    );
    return res.status(HttpStatus.OK).send('Updated');
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string, @Res() res: Response) {
    this.productsService.deleteProduct(Number(productId));
    return res.status(HttpStatus.OK).send('Resource deleted successfully');
  }
}
