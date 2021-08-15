/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { Controller, Get } from '@nestjs/common';
import { SampleService } from '../services/sample.service';

@Controller('sample')
export class SampleController {
    constructor(private sampleService: SampleService) {}

    @Get('ping')
    ping(): string {
        console.log(1);

        return 'pong';
    }

    @Get('getDatabaseVersion')
    getDatabaseVersion(): Promise<any> {
        return this.sampleService.getVersion().catch((response) => {
            console.log(response);
        });
    }
}
