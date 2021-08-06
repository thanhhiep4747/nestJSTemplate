import { BaseRepository } from 'src/modules/shared/base.repository';
import { Injectable, Query } from '@nestjs/common';

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
    const query = `
    DECLARE	@return_value int

    EXEC	@return_value = [dbo].[InsertProduct]
            @Name = N'${name}',
            @Price = ${price},
            @InStock = ${inStock},
            @Images = N'${images}'

    SELECT	'Return Value' = @return_value
    `;
    return this.queryAsync(query);
  }

  updateProduct(
    id: number,
    name: string,
    price: number,
    inStock: number,
    images: string,
  ): Promise<any> {
    const query = `
    UPDATE dbo.products 
    SET name = '${name}', price = ${price}, in_stock = ${inStock}, images = '${images}'
    WHERE id = ${id};
    `;
    return this.queryAsync(query);
  }

  deleteProduct(id: number): Promise<any> {
    const query = `
      DELETE FROM dbo.products WHERE id=${id};
      `;
    return this.queryAsync(query);
  }

  getProductSizes(id: number): Promise<any> {
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
    const query = `
      insert into dbo.products_sizes (product, size)
      Select ${id}, '${size}' Where not exists(select * from dbo.products_sizes where product=${id} and size='${size}');
      `;
    return this.queryAsync(query);
  }

  deleteProductSizes(id: number): Promise<any> {
    return this.queryAsync(`
      delete from dbo.products_sizes where product = ${id};
      `);
  }
}
