import { Module } from '@nestjs/common';
import { JsonCompareController } from './JsonCompare.controller';
import { JsonCompareService } from './JsonCompare.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [JsonCompareController],
  providers: [JsonCompareService],
})
export class JsonComparemodule {}
