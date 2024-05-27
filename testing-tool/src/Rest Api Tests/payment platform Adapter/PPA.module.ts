// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { PPAController } from './PPA.controller';
import { PPAService } from './PPA.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PPAController],
  providers: [PPAService],
})
export class PPAmodule {}
