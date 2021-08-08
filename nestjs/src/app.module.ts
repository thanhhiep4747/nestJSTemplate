import { ProductsModule } from './modules/products/products.module';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsService } from './jobs.service';
import { SampleModule } from './modules/sample/sample.module';
import { SizesService } from './modules/products/service/sizes.service';

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
