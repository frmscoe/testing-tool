export class RequestModel {
    constructor(
        public Url: string,
        public postData: string,
        public ExpectedResultData: string,
        public IgnoreFields: string[],
    ) { }
}
