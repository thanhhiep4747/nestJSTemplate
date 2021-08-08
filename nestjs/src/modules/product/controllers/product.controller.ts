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
        const sizes = await this.productService.getProductSizes(id);
        if (products.recordset.length > 0){
            products.recordset[0].sizes = sizes.recordset;
        }
        return products.recordset;
        
    }

    @Get('size-table')
    async getSizeTable() {
        const sizeTable = await this.productService.getSizeTable();
        return sizeTable.recordset;
    }

    @Get('category-table')
    async getCategoryTable() {
        const categoryTable = await this.productService.getCategoryTable();
        return categoryTable.recordset;
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto){
        console.log(product);
        const res = await this.productService.createProduct(product);
        return res.recordset;
    }
    
    @Put('/:id')
    async updateProductById(@Param('id') id: number, @Body() product: UpdateProductDto){
        const res = await this.productService.updateProduct(id, product);
        return res.recordset;
    }

    @Delete('/:id')
    async deleteProductById(@Param('id') id: number){
        const res = await this.productService.deleteProduct(id);
        return res.recordset;
    }
}
