// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { chanelOrchestratorTestmodule } from './Rest Api Tests/chanel orchestrator/chanelOrchestratorTest.module';
import { nifiToolModule } from './GrpcApiTests/nifitool/nifiTool.module';
import { CDPmodule } from "./Rest Api Tests/channel decisioning processor/CDP.module";
import { CRmodule } from "./Rest Api Tests/Channel Router/CR.module";
import { PPAmodule } from './Rest Api Tests/payment platform Adapter/PPA.module';
import { TMSmodule } from './Rest Api Tests/transaction monitoring service/TMS.module';
import { TMSToolModule } from './GrpcApiTests/transaction monitoring service/TMSTool.module';
import { SpanOptions } from 'src/config';
@Module({
  imports: [
    TMSToolModule,
    TMSmodule,
    PPAmodule,
    CRmodule,
    CDPmodule,
    nifiToolModule,
    chanelOrchestratorTestmodule
  ],
  controllers: [AppController], //handles requests and sends responses
  providers: [AppService], //extra classes or services
})

export class AppModule {
  apm = require("elastic-apm-node").start(SpanOptions);
}
