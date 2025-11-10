import { HttpException } from "@/utils/http-exeption";
import { responseBuilder } from "@/utils/response-handler";
import express, { NextFunction, Request, Response } from "express";
import { PrismaError } from "@/utils/prisma";

const middleware = express();

middleware.use(
  (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log("Error caught by middleware:", err);
    if (err instanceof HttpException) {
      responseBuilder.optional({
        res,
        category: err.errorCategory,
        code: err.errorCode,
        message: err.message,
      });
    } else if (err instanceof PrismaError) {
      if (err.code === "P2002") {
        responseBuilder.conflict({
          res,
          message: `${err.meta?.target} dari ${err.meta?.modelName} telah digunakan`,
        });

        return;
      } else if (err.code === "P2025") {
        responseBuilder.notFound({
          res,
          message: `${err.meta?.target} dari ${err.meta?.modelName} tidak ditemukan`,
        });

        return;
      }
      responseBuilder.internalServerError({
        res,
        message: `${err.meta?.cause} At ${err.meta?.modelName} table`,
      });

      return;
    } else {
      responseBuilder.internalServerError({ res, message: err.message });

      return;
    }
  },
);

export default middleware;