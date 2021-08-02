import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

export class BaseJob {
    constructor(
        protected schedulerRegistry: SchedulerRegistry
    ) { 
        const job = new CronJob('', this.doWork.bind(this));
        schedulerRegistry.addCronJob(this.constructor.name, job);
    }

    protected doWork?();
}