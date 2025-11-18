"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    message;
    errorCode;
    errorCategory;
    constructor(errorCode, errorCategory, message) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.errorCategory = errorCategory;
    }
}
exports.HttpException = HttpException;
