import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/config/database/base.repository';

@Injectable()
export class SampleRepository extends BaseRepository {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getVersion(): Promise<any> {
        return this.queryAsync('SELECT @@Version');
    }
}
