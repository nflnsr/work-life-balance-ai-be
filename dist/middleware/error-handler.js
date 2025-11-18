"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exeption_1 = require("@/utils/http-exeption");
const response_handler_1 = require("@/utils/response-handler");
const express_1 = __importDefault(require("express"));
const prisma_1 = require("@/utils/prisma");
const middleware = (0, express_1.default)();
middleware.use((err, req, res, next) => {
    console.log("Error caught by middleware:", err);
    if (err instanceof http_exeption_1.HttpException) {
        response_handler_1.responseBuilder.optional({
            res,
            category: err.errorCategory,
            code: err.errorCode,
            message: err.message,
        });
    }
    else if (err instanceof prisma_1.PrismaError) {
        if (err.code === "P2002") {
            response_handler_1.responseBuilder.conflict({
                res,
                message: `${err.meta?.target} dari ${err.meta?.modelName} telah digunakan`,
            });
            return;
        }
        else if (err.code === "P2025") {
            response_handler_1.responseBuilder.notFound({
                res,
                message: `${err.meta?.target} dari ${err.meta?.modelName} tidak ditemukan`,
            });
            return;
        }
        response_handler_1.responseBuilder.internalServerError({
            res,
            message: `${err.meta?.cause} At ${err.meta?.modelName} table`,
        });
        return;
    }
    else {
        response_handler_1.responseBuilder.internalServerError({ res, message: err.message });
        return;
    }
});
exports.default = middleware;
