
import "dotenv/config";
if (process.env.NODE_ENV === "production") {
  require("./module-alias");
}
import express, { type Application } from "express";
import { SERVER_PORT } from "./utils/constant";
import router from "./routes/index";
import cors from "cors";
import http from "http";
// import errorHandler from "./middleware/error-handler";
import { HttpException } from "@/utils/http-exeption";
import { responseBuilder } from "@/utils/response-handler";
import { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { PrismaError } from "@/utils/prisma";
import "./jobs/index";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://squid-app-7zyhx.ondigitalocean.app"],
    credentials: true,
    preflightContinue: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
  })
);

// app.options("*", cors({
//   origin: "https://test-data-integrasi-inovasi-fe.vercel.app",
//   credentials: true,
// }));

app.use(express.json());

app.use(cookieParser());
app.use(router);

app.use(
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
      console.log(err);
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

app.get("/", (req, res) => {
  console.log("Root endpoint accessed");
  res.send("Welcome to the API");
});

const server = http.createServer(app);
server.timeout = 600000;

const port = process.env.PORT || SERVER_PORT;

server
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err.message);
  });

export default app;