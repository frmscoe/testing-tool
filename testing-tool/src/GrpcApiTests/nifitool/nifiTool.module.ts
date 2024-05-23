// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { nifiTool } from './nifiTool.controller'

@Module({
  imports: [],
  controllers: [nifiTool],
  providers: [],
})
export class nifiToolModule {}
