"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
if (process.env.NODE_ENV === "production") {
    require("./module-alias");
}
const express_1 = __importDefault(require("express"));
const constant_1 = require("./utils/constant");
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
// import errorHandler from "./middleware/error-handler";
const http_exeption_1 = require("@/utils/http-exeption");
const response_handler_1 = require("@/utils/response-handler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma_1 = require("@/utils/prisma");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://xr5wvcsx-3000.asse.devtunnels.ms"],
    credentials: true,
    preflightContinue: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}));

app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(index_1.default);
app.use((err, req, res, next) => {
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
        console.log(err);
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
app.get("/", (req, res) => {
    console.log("Root endpoint accessed");
    res.send("Welcome to the API");
});
const server = http_1.default.createServer(app);
server.timeout = 600000;
const port = process.env.PORT || constant_1.SERVER_PORT;
server
    .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
    .on("error", (err) => {
    console.error("Server error:", err.message);
});
exports.default = app;
