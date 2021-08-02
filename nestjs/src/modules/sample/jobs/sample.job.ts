import { Injectable } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { BaseJob } from "src/modules/shared/base.job";

@Injectable()
export class SampleJob extends BaseJob {
    constructor(
        protected schedulerRegistry: SchedulerRegistry
    ) {
        super(schedulerRegistry);
    }

    async doWork() {
        console.log('ping');
    }
}