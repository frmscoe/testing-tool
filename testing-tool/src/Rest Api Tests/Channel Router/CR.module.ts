// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { CRController } from './CR.controller';
import { CRService } from './CR.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CRController],
  providers: [CRService],
})
export class CRmodule {}
