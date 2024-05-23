// SPDX-License-Identifier: Apache-2.0

import { Observable } from 'rxjs';

export interface IGrpcService {
  send(flowFileRequest: FlowFileRequest): Observable<any>;
}
 
interface FlowFileRequest {
  id;
  attributes;
  content;
}