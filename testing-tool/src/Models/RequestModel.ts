// SPDX-License-Identifier: Apache-2.0

export class RequestModel {
    constructor(
        public Url: string,
        public postData: string,
        public ExpectedResultData: string,
        public IgnoreFields: string[],
    ) { }
}
