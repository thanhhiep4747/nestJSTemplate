/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/base.repository';
import { product } from 'src/modules/shared/models/productModel';

@Injectable()
export class ProductRepository extends BaseRepository {
  getProduct(): Promise<any> {
    return this.queryAsync('SELECT * FROM dbo.products;')
  }
  addProduct(name:string,price:number,img:string,detail:string):Promise<any>{
return this.queryAsync(`exec addproduct N'${name}',${price},'${img}',N'${detail}'`)
  }
  addSize(size:number){
      return this.queryAsync(`insert into sizes(nsize) values(${size});`)
  }
  addsizeofProduct(list_add:string){
return this.queryAsync(`insert into product_size(size,proid,number) values${list_add}`)
  }
  getProducts(){
    return this.queryAsync('exec getProduct')
  }
  getDetailProduct(id:number){
    return this.queryAsync(`exec getdetailproduct ${id}`)
  }
  // getSizeProduct(id:number){
  //   return this.queryAsync(`select size,number  from product_size whewe proid=${id}`)
  // }
  deleteProduct(id:number){
    return this.queryAsync(`delete from products where pid=${id}`)
  }
  getAllSize(){
    return this.queryAsync("select nsize from sizes;")
  }
  updateProduct(id:number,product:product){
    return this.queryAsync(`exec updateProduct ${id},N'${product.name}',${product.price},N'${product.img}',N'${product.detail}'`)
  }
  updateProductsize(id:number,size:number,num:number){
    return this.queryAsync(`exec updateProductSize ${id},${size},${num}`)
  }
}
