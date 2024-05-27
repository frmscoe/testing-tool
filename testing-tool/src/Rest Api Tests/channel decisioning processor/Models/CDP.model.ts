// SPDX-License-Identifier: Apache-2.0

export class CDPModel {
  constructor(
    public Url: string,
    public postData: string,
    public ExpectedResultData: string,
  ) {}
}
