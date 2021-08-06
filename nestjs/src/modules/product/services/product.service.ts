import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repositories';

@Injectable()
export class ProductService {
  /**
   *
   */
  constructor(private ProductRepository: ProductRepository) {}

  getProduct(): Promise<any> {
    return this.ProductRepository.getProduct();
  }
  addProduct(nam:string,price:number,img:string,detail:string):Promise<any>{
    return this.ProductRepository.addProduct(nam,price,img,detail)
  }
  addSize(size:number){
    return this.ProductRepository.addSize(size)
  }
  addsizeofProduct(list_add:string){
    return this.ProductRepository.addsizeofProduct(list_add)
  }
  getProducts(){
    return this.ProductRepository.getProducts()
  }
  getDetailProduct(id:number){
    return this.ProductRepository.getDetailProduct(id)
  }
  // getSizeProduct(id:number){
  //   return this.ProductRepository.getSizeProduct(id)
  // }
  deleteProduct(id:number){
    return this.ProductRepository.deleteProduct(id)
  }
  getAllSize(){
    return this.ProductRepository.getAllSize()
  }
  updateProductSize(id:number,size:number,number:number){
    return this.ProductRepository.updateProductsize(id,size,number)
  }
  updaterpoductInfo(id:number,product){
    return this.ProductRepository.updateProduct(id,product)
  }
}
