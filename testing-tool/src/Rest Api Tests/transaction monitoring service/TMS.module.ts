// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { TMSController } from './TMS.controller';
import { TMSService } from './TMS.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [TMSController],
  providers: [TMSService],
})
export class TMSmodule {}
