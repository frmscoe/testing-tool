import { Module } from '@nestjs/common';
import { CRSP } from './CRSP.controller'

@Module({
  imports: [],
  controllers: [CRSP],
  providers: [],
})
export class CRSPModule {}
