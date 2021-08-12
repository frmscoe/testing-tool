import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpanOptions } from 'src/config';

import { JsonComparemodule } from './Rest Api Tests/Json Compare/JsonCompare.module';
import { StringComparemodule } from './Rest Api Tests/String Compare/StringCompare.module';


import { CRSPModule } from './GrpcApiTests/CRSP/CRSP.module';
import { nifiToolModule } from './GrpcApiTests/Typology Processor/nifiTool.module';
@Module({
  imports: [
    JsonComparemodule,
    StringComparemodule,
    CRSPModule,
    nifiToolModule
  ],
  controllers: [AppController], //handles requests and sends responses
  providers: [AppService], //extra classes or services
})

export class AppModule {
  apm = require("elastic-apm-node").start(SpanOptions);
}
