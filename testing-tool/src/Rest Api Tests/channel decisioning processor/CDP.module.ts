// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { CDPController } from './CDP.controller';
import { CDPService } from './CDP.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CDPController],
  providers: [CDPService],
})
export class CDPmodule {}
