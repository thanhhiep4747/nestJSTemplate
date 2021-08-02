import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  name: string;
  version: string;
  constructor() {
    this.name = process.env.APP_NAME;
    this.version = process.env.APP_VERSION;
  }
}
