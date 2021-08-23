import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RequestResponse } from "../../Models/requestResponse";
import { RequestModel } from 'src/Models/RequestModel';
import { CompareObjectsHelper } from 'src/Helpers/CompareObjects';
@Injectable()
export class JsonCompareService {
  constructor(private httpService: HttpService) { }
  getWithParam(param: any) {
    console.log(param);
    return param;
  }

  async postSampleRequest(sample: RequestModel): Promise<RequestResponse> {
    const requestResponse: RequestResponse = new RequestResponse();

    let request: AxiosResponse;

    try {
      request = await firstValueFrom(this.httpService.post(sample.Url, sample.postData, sample.AttachHeaders));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    };
    console.log(JSON.stringify(request.data))

    if (JSON.stringify(CompareObjectsHelper.difference(sample.ExpectedResultData, request.data, sample.IgnoreFields)) !== "{}") {
      requestResponse.ResponseMessage =
      {
        message: 'Failed Matches At ',
        Result: CompareObjectsHelper.difference(sample.ExpectedResultData, request.data, sample.IgnoreFields)
      };
      requestResponse.httpStatus = HttpStatus.NOT_ACCEPTABLE;
      throw new HttpException(requestResponse, HttpStatus.NOT_ACCEPTABLE);
    } else {
      requestResponse.ResponseMessage = 'expected data match received data';
      requestResponse.httpStatus = HttpStatus.OK;
    }
    return requestResponse;
  }
}
