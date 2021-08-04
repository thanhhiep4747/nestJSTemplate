import { BaseRepository } from 'src/modules/shared/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository extends BaseRepository {
  getProducts(): Promise<any> {
    return this.queryAsync(`select * from dbo.products`);
  }

  getProduct(id: number): Promise<any> {
    return this.queryAsync(`select * from dbo.products where id=${id};`);
  }

  insertProduct(
    name: string,
    price: number,
    inStock: number,
    images: string,
  ): Promise<any> {
    return this.queryAsync(`
        DECLARE	@return_value int

        EXEC	@return_value = [dbo].[InsertProduct]
                @Name = N'${name}',
                @Price = ${price},
                @InStock = ${inStock},
                @Images = N'${images}'

        SELECT	'Return Value' = @return_value
        `);
  }

  updateProduct(
    id: number,
    name: string,
    price: number,
    inStock: number,
    images: string,
  ): Promise<any> {
    return this.queryAsync(`
        UPDATE dbo.products 
        SET name = '${name}', price = ${price}, in_stock = ${inStock}, images = '${images}'
        WHERE id = ${id};
      `);
  }

  deleteProduct(id: number): Promise<any> {
    return this.queryAsync(`
      DELETE FROM dbo.products WHERE id=${id};
      `);
  }

  getProductSize(id: number): Promise<any> {
    return this.queryAsync(`
        SELECT size FROM dbo.products_sizes WHERE product=${id} order by size desc;
      `);
  }

  getSizes(): Promise<any> {
    return this.queryAsync(`
        SELECT * FROM dbo.sizes;
      `);
  }

  insertProductSize(id: number, size: string): Promise<any> {
    return this.queryAsync(`
        insert into dbo.products_sizes (product, size) values (${id}, '${size}')
      `);
  }

  deleteProductSize(id: number, size: string): Promise<any> {
    return this.queryAsync(`
      delete from dbo.products_sizes where product = ${id} and size = '${size}'
      `);
  }
}
