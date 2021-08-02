/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/base.repository';

@Injectable()
export class SampleRepository extends BaseRepository {
  getVersion(): Promise<any> {
    return this.queryAsync('SELECT @@Version');
  }
}
