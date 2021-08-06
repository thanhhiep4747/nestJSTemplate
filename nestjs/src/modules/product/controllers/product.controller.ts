import { Controller, Get, Post, Put, Delete, Body, Param, Query,Res,HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { product } from 'src/modules/shared/models/productModel';
import { threadId } from 'worker_threads';
import { Response } from 'express';
@Controller('api/products')
export class ProductController{
    constructor(
        private ProductService: ProductService
    ) { }
    @Get()
     findAll(@Res({ passthrough: true }) res: Response){
        return  this.ProductService.getProducts()
        .then(data=>{
            // console.log(data.recordset)
            res.send({status:1,data:data.recordset})
        })
        .catch(err=>{
            // res.status(HttpStatus.AMBIGUOUS)
            res.send({status:0,data:"There was some error while accessing the data"})
        })
    }
    @Get('size')
    findAllSize(@Res({ passthrough: true }) res: Response){
        return  this.ProductService.getAllSize()
        .then(data=>{
            // console.log(data.recordset)
            res.send({status:1,data:data.recordset})
        })
        .catch(err=>{
            console.log(err)
            // res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            res.send({status:0,data:"query size fail"})
        })
    }
    @Get(':id')
    findOne(@Param() params,@Res({ passthrough: true }) res: Response){
        
        return this.ProductService.getDetailProduct(params.id)
        .then(data=>{
            res.send({status:1,data:data.recordset})
        }).catch(err=>{
            // res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            res.send({status:0,message:"Load data error, id is not exists or server error"})
            
            })
    }
    @Put(':id')
    updateOne(@Param() params,@Body() body:product,@Res({ passthrough: true }) res: Response){
        let promise=[]
        promise.push(this.ProductService.updaterpoductInfo(params.id,body))
for (let i of body.size){
promise.push(this.ProductService.updateProductSize(params.id,i.size,i.nop))
}
return Promise.all(promise)
.then(data=>{
    res.send({status:1})
})
.catch(err=>{
    // res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    console.log(err)
    res.send({status:0,message:"An error occurred while inserting the product, please review our data"})
}
    )
    }
    @Delete(':id')
    deleteone(@Param() params,@Res({ passthrough: true }) res: Response){
        return this.ProductService.deleteProduct(params.id)
        .then(data=>res.send({status:1}))
        .catch(err=>{
            // res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            res.send({status:0,message:"Delete failed"})
        })
    }


}