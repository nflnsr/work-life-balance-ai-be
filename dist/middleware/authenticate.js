"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("@/utils/jwt");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // const accessToken = req.headers.cookie?.split("; ").find(cookie => cookie.startsWith("accessToken="))?.split("=")[1];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ status: "error", message: "Authorization header missing or invalid" });
        return;
    }
    const accessToken = authHeader.split(" ")[1];
    const user = (0, jwt_1.verifyAccessToken)(accessToken);
    req.user = user;
    if (user === null) {
        res.status(401).json({ status: "error", message: "Invalid token" });
        return;
    }
    next();
};
exports.authenticate = authenticate;
