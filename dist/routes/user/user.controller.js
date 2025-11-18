"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt_1 = require("../../utils/jwt");
const response_handler_1 = require("@/utils/response-handler");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(req, res, next) {
        try {
            const users = await this.userService.getUsers();
            if (!users) {
                res.status(404).json({ error: "No users found" });
                return;
            }
            response_handler_1.responseBuilder.success({ res, data: users });
            return;
        }
        catch (error) {
            response_handler_1.responseBuilder.internalServerError({ res });
            return;
        }
    }
    async getProfile(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const user = await this.userService.getProfile(userId);
            if (!user) {
                response_handler_1.responseBuilder.notFound({ res, message: "User not found" });
                return;
            }
            response_handler_1.responseBuilder.success({ res, data: user });
            return;
        }
        catch (error) {
            response_handler_1.responseBuilder.internalServerError({ res });
            return;
        }
    }
    async createUser(req, res, next) {
        try {
            const data = req.body;
            const newUser = await this.userService.createUser(data);
            response_handler_1.responseBuilder.created({ res, data: newUser });
            return;
        }
        catch (error) {
            next(error);
        }
    }
    async loginUser(req, res, next) {
        try {
            const data = req.body;
            const user = await this.userService.loginUser(data);
            if (!user) {
                response_handler_1.responseBuilder.unauthorized({ res, message: "Invalid email or password" });
                return;
            }
            const { password, ...userData } = user;
            const accessToken = (0, jwt_1.generateAccessToken)(userData);
            const refreshToken = (0, jwt_1.generateRefreshToken)(userData);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            response_handler_1.responseBuilder.success({ res, data: { user: userData, accessToken, refreshToken } });
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            response_handler_1.responseBuilder.internalServerError({ res, message: errorMessage });
            return;
        }
    }
    async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                response_handler_1.responseBuilder.unauthorized({ res, message: "Refresh token missing" });
                return;
            }
            const user = (0, jwt_1.verifyRefreshToken)(refreshToken);
            if (!user) {
                response_handler_1.responseBuilder.unauthorized({ res, message: "Invalid refresh token" });
                return;
            }
            const newAccessToken = (0, jwt_1.generateAccessToken)(user);
            const newRefreshToken = (0, jwt_1.generateRefreshToken)(user);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
            response_handler_1.responseBuilder.success({
                res,
                data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
            });
            return;
        }
        catch (error) {
            next(error);
        }
    }
    async logoutUser(req, res, next) {
        try {
            res.clearCookie("refreshToken");
            response_handler_1.responseBuilder.success({ res, data: { message: "Logout successful" } });
            return;
        }
        catch (error) {
            response_handler_1.responseBuilder.internalServerError({ res });
            return;
        }
    }
}
exports.UserController = UserController;
