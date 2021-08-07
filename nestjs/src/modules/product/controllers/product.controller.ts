/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Put, Res} from '@nestjs/common';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../services/Product.service';
import { Response } from 'express';
import { Body } from '@nestjs/common';
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService){}


  @Get(':id')
  getProduct(@Param('id') id: string, @Res({passthrough: true}) res: Response):Product{
    let result: Product;

    return this.productService.getProduct(id)
    .then( data => {
      if(data.recordset){
        const recordset = data.recordset;
        const lstSize = [];

        for (const record of recordset){
            lstSize.push(record.des);
        }
        
        result = {
            id: recordset[0].productId, 
            title: recordset[0].productTitle, 
            image: recordset[0].productImage,
            price: recordset[0].productPrice,
            size: lstSize
        }
        res.send(result);
      }
    })
    .catch( () => {
      res.send('error');
    })
  }

  @Get()
  findAll(@Res({passthrough: true}) res: Response): Product[] {
    return this.productService.findAll()
    .then((data)=>{
     res.send(data.recordset) ;
    })
    .catch(()=>{
      res.send('error');
    })
  }


  @Put()
  updateProduct(@Body() data: Product, @Res({passthrough: true}) res: Response): any{
    const result = [];
    result.push(this.productService.removeProductSize(data.id));
    

    for(const size of data.size){
      result.push(this.productService.updateProductSize(data.id, size));
    }

    result.push(this.productService.updateProduct(data.id, data.price, data.title, data.image));
    return Promise.all(result)
    .then( () => {
      res.send('success')
    })
    .catch( () => {
      res.send('error')
    })
    
  }

  @Post()
  insertProduct(@Body() data: Product, @Res({passthrough: true}) res: Response): any{
    const result = [];

    result.push(this.productService.insertProduct(data.id, data.price, data.title, data.image));

    for(const size of data.size){
      result.push(this.productService.updateProductSize(data.id, size));
    }

    return Promise.all(result)
    .then( () => {
      res.send('success')
    })
    .catch( () => {
      res.send('error')
    })
    
  }

  @Delete(':id')
  removeProduct(@Param('id') id: number, @Res({passthrough: true}) res: Response): any{
    const result = [];

    result.push(this.productService.removeProductSize(id));

    result.push(this.productService.removeProduct(id));

    return Promise.all(result)
    .then( () => {
      res.send('success')
    })
    .catch( () => {
      res.send('error')
    })
    
  }


  
}
