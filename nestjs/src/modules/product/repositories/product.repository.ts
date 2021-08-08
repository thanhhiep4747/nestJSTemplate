import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository {
  getVersion(): Promise<any> {
    return this.queryAsync('SELECT @@Version');
  }
  getAllProducts(): Promise<any> {
      return this.queryAsync('SELECT * FROM Product');
  }
  getProductById(id: number): Promise<any> {
      return this.queryAsync(`SELECT * FROM Product WHERE Product.id = ${id}`);
  }
}
