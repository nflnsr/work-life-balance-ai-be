"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToken = exports.verifyAccessToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, String(process.env.JWT_ACCESS_SECRET));
    }
    catch (error) {
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const generateAccessToken = (data) => {
    const payload = { ...data };
    delete payload.iat;
    delete payload.exp;
    return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_ACCESS_SECRET), {
        expiresIn: "3600s",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (data) => {
    const payload = { ...data };
    delete payload.iat;
    delete payload.exp;
    return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_REFRESH_SECRET), {
        expiresIn: "68400s",
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, String(process.env.JWT_REFRESH_SECRET));
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const parseToken = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        return null;
    }
};
exports.parseToken = parseToken;
