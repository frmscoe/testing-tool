import { Module } from '@nestjs/common';
import { TMSTool } from './TMSTool.controller'

@Module({
  imports: [],
  controllers: [TMSTool],
  providers: [],
})
export class TMSToolModule {}
