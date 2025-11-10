import { responseHandler } from "@/utils/response-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError, ZodType } from "zod";

export const validate =
  <T>(schema: ZodType<T>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const parseBody = schema.safeParse(req.body);
    if (!parseBody.success) {
      const statusCode = statusCodeCheck<T>(parseBody.error);
      responseHandler.optional({
        category: "client_error",
        code: statusCode,
        res,
        message: messageGenerator<T>(parseBody.error),
      });
      return;
    }
    next();
  };

const statusCodeCheck = <T>(error: ZodError<T>) => {
  if (error.issues.some((err) => err.message === "Required")) {
    return 400;
  } else {
    return 422;
  }
};

const messageGenerator = <T>(error: ZodError<T>) => {
  return (
    error.issues
      .map((err) => {
        if (err.path.length === 0) {
          return `${err.message}`;
        } else {
          return `${err.message} at ${err.path[0].toString().replace("_", " ")}`;
        }
      })
      .join(". ") + "."
  );
};
