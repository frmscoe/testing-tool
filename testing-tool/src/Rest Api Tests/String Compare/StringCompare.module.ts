import { Module } from '@nestjs/common';
import { StringCompareController } from './StringCompare.controller';
import { StringCompareService } from './StringCompare.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [StringCompareController],
  providers: [StringCompareService],
})
export class StringComparemodule {}
