// SPDX-License-Identifier: Apache-2.0

import { HttpStatus } from "@nestjs/common";


export class RequestResponse {
    public ResponseMessage: any;
    public httpStatus: HttpStatus;
    private DateCreated: any = new Date().toLocaleDateString();
    private TImeCreated: any = new Date().toLocaleTimeString();
}