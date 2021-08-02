/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SampleRepository } from '../repositories/sample.repository';

@Injectable()
export class SampleService {
  /**
   *
   */
  constructor(private sampleRepository: SampleRepository) {}

  getVersion(): Promise<any> {
    return this.sampleRepository.getVersion();
  }
}
