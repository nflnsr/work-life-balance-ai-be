"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const response_handler_1 = require("@/utils/response-handler");
const validate = (schema) => (req, res, next) => {
    const parseBody = schema.safeParse(req.body);
    if (!parseBody.success) {
        const statusCode = statusCodeCheck(parseBody.error);
        response_handler_1.responseHandler.optional({
            category: "client_error",
            code: statusCode,
            res,
            message: messageGenerator(parseBody.error),
        });
        return;
    }
    next();
};
exports.validate = validate;
const statusCodeCheck = (error) => {
    if (error.issues.some((err) => err.message === "Required")) {
        return 400;
    }
    else {
        return 422;
    }
};
const messageGenerator = (error) => {
    return (error.issues
        .map((err) => {
        if (err.path.length === 0) {
            return `${err.message}`;
        }
        else {
            return `${err.message} at ${err.path[0].toString().replace("_", " ")}`;
        }
    })
        .join(". ") + ".");
};
