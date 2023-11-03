export class ErrorDetails {

    constructor(
        public timestamp: Date,
        public message: string,
        public details: string[],
    ) { }
}