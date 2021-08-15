/* eslint-disable no-console */

import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronTime } from 'cron';
import * as jobConfigs from '../../config/job/jobs-config.json';

@Injectable()
export class JobsService {
    private readonly logger = new Logger(JobsService.name);

    constructor(schedulerRegistry: SchedulerRegistry) {
        const enabledJobs = jobConfigs.jobs.filter((j) => {
            return j.enable;
        });

        console.log('Start jobs:');
        console.log(enabledJobs);
        console.log('---------------');

        enabledJobs.forEach((j) => {
            if (!j.enable) {
                return;
            }
            const job = schedulerRegistry.getCronJob(j.name);
            job.setTime(new CronTime(j.cronTime));
            job.start();
        });
    }
}
