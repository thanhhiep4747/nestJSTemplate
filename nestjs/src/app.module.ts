/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsService } from './jobs.service';
import { SampleModule } from './modules/sample/sample.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SampleModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JobsService],
})
export class AppModule {}
