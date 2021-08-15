import { Injectable } from '@nestjs/common';
import { SampleRepository } from '../repositories/sample.repository';

@Injectable()
export class SampleService {
    constructor(private sampleRepository: SampleRepository) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getVersion(): Promise<any> {
        return this.sampleRepository.getVersion();
    }
}
