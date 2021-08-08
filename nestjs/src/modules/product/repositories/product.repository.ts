import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/base.repository';
import { CreateProductDto } from '../create-product.dto';
import { UpdateProductDto } from '../update-product.dto';

@Injectable()
export class ProductRepository extends BaseRepository {
  getVersion(): Promise<any> {
    return this.queryAsync('SELECT @@Version');
  }
  getAllProducts(): Promise<any> {
      return this.queryAsync(`select P.id, P.name, P.price, P.category, P.imageUrl, SUM(PS.quantity) as "quantity"
      from Product P join Product_Size PS
        on P.id = PS.productId
      group by P.id, P.name, P.price, P.category, P.imageUrl;`);
  }
  getProductById(id: number): Promise<any> {
      return this.queryAsync(`SELECT * FROM Product WHERE Product.id = ${id}`);
  }
  getProductSizes(id: number): Promise<any> {
    return this.queryAsync(`SELECT sizeId, quantity FROM Product_Size WHERE productId = ${id}`);
  }
  createProduct(productDto: CreateProductDto): Promise<any> {
      let query = `DECLARE @currentId int;
      INSERT INTO Product(name, price, category, imageUrl) VALUES 
      ('${productDto.name}', ${productDto.price}, ${productDto.category}, '${productDto.imageUrl}');
      SELECT @currentId = SCOPE_IDENTITY();`
      if (productDto.sizes.length > 0){
        query += "INSERT INTO Product_Size(productId, sizeId, quantity) VALUES ";
        productDto.sizes.forEach((sizeQuantity, index) => {
          query += `(@currentId, ${sizeQuantity.sizeId}, ${sizeQuantity.quantity})`;
          if (index !== productDto.sizes.length - 1)
            query += ',';
          else
            query += ';';
        })
      }
      console.log(query);
      return this.queryAsync(query);
  }
  updateProduct(id: number, productDto: UpdateProductDto): Promise<any> {
    let query = `UPDATE Product 
      SET name = '${productDto.name}', price = ${productDto.price}, category =${productDto.category}, imageUrl = '${productDto.imageUrl}'
      WHERE id = ${id};
      DELETE FROM Product_Size WHERE productId = ${id};`

      if (productDto.sizes.length > 0){
        query += "INSERT INTO Product_Size(productId, sizeId, quantity) VALUES ";
        productDto.sizes.forEach((sizeQuantity, index) => {
          query += `(${id}, ${sizeQuantity.sizeId}, ${sizeQuantity.quantity})`;
          if (index !== productDto.sizes.length - 1)
            query += ',';
          else
            query += ';';
        })
      }
      console.log(query);
      return this.queryAsync(query);
  }
  deleteProduct(id: number): Promise<any> {
    return this.queryAsync(`DELETE FROM Product_Size WHERE productId = ${id};
    DELETE FROM Product WHERE id = ${id};`);
  }
  getSizeTable(): Promise<any> {
    return this.queryAsync("SELECT * FROM Size");
  }
  getCategoryTable(): Promise<any> {
    return this.queryAsync("SELECT * FROM Category");
  }
}
