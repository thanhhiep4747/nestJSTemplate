import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { CreateProductDto } from '../create-product.dto';
import { UpdateProductDto } from '../update-product.dto';
import { ProductService } from '../services/product.service';
@Controller('api/products')
export class ProductController {

    constructor(private productService: ProductService){}

    @Get()
    async getAllProducts() {
        const products = await this.productService.getAllProducts();
        return products.recordset;
    }

    @Get('/:id')
    async getProductById(@Param('id') id: number) {
        const products = await this.productService.getProductById(id);
        return products.recordset;
    }

    @Post()
    createProduct(@Body() product: CreateProductDto){
        
    }
    
    @Put('/:id')
    updateProductById(@Body() product: UpdateProductDto, @Param('id') id: number){
        return "Product id " + id + " is updated";
    }

    @Delete('/:id')
    deleteProductById(@Param('id') id: number){
        return "Product id " + id + " is deleted";
    }
}
