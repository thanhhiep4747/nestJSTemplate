import { Controller, Get, Post, Put, Delete, Body, Param, Query,Res,HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { product } from 'src/modules/shared/models/productModel';
import { threadId } from 'worker_threads';
import { Response } from 'express';
@Controller('api/add-product')
export class AddproductController{
    constructor(
        private ProductService: ProductService
    ) { }
    @Post()
    async addProduct(@Body() productInfo:product,@Res({ passthrough: true }) res: Response){
         await this.ProductService.addProduct(productInfo.name,productInfo.price,productInfo.img,productInfo.detail)
        .then(data=>{
            console.log(data.recordset[0].id)
            let id:number=data.recordset[0].id;
            let list_a:string=""
            let len:number=productInfo.size.length
            if (len!=0){
            
            let coutn:number=0
            for (let i of productInfo.size){
                coutn+=1;
                list_a+=`(${i.size},${id},${i.nop})`;
                if (coutn!=len)list_a+=','
            }
            console.log(productInfo.size,list_a)
        return this.ProductService.addsizeofProduct(list_a)
        .then(data=>{
            res.status(HttpStatus.OK)
            res.send({id:id})
        })
            }
            else {
                res.status(HttpStatus.OK)
            res.send({id:id})
            }
            
        })
        .catch(err=>{
            console.log(1)
            res.status(HttpStatus.BAD_REQUEST)
            res.send({please:"size:{'size':number,'nop':number}"})
            return 0
        })        
    }
    @Post('addsize')
    addSize(@Body() size:number[],@Res({ passthrough: true }) res: Response){
        console.log(size)
        let pro=[]
        for (let i of size){
        // await this.ProductService.addSize(i)
        pro.push(this.ProductService.addSize(i))
        }
        return Promise.all(pro)
        .then(data=>{
            console.log(data)
            res.send({status:1})
        })
        .catch(err=>{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    res.send({status:0,message:err})
        })
    }

}
