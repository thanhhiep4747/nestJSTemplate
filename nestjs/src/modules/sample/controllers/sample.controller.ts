import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SampleService } from '../services/sample.service';

@Controller('api/sample')
export class SampleController {
    constructor(
        private sampleService: SampleService
    ) { }

    @Get("ping")
    ping(): string {
        return "pong";
    }

    @Get("getDatabaseVersion")
    getDatabaseVersion(): Promise<any> {
        return this.sampleService.getVersion();
    }
}