import { CreateProductDto } from './../dto/create-product.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProduct } from '../model/createProduct.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProduct: CreateProduct) {
    return await this.productsService.createProduct(createProduct);
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get(':proId')
  async getProductById(@Param('proId') proId: string) {
    return await this.productsService.getProductById(proId);
  }

  @Put(':proId')
  async updateProductById(
    @Param('proId') proId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.updateProductById(
      proId,
      updateProductDto,
    );
  }

  @Delete(':proId')
  async deleteProductById(@Param('proId') proId: string) {
    return await this.productsService.deleteProductById(proId);
  }
}
