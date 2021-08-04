import { Module } from '@nestjs/common';
import { SampleController } from './controllers/sample.controller';
import { SampleJob } from './jobs/sample.job';
import { SampleRepository } from './repositories/sample.repository';
import { SampleService } from './services/sample.service';
@Module({
  imports: [],
  providers: [SampleJob, SampleService, SampleRepository],
  controllers: [SampleController],
  exports: [],
})
export class SampleModule {}
