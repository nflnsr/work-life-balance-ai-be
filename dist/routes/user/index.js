"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const validate_1 = require("@/middleware/validate");
const register_1 = require("@/validator/register");
const login_1 = require("@/validator/login");
const router = (0, express_1.Router)();
const userRepository = new user_repository_1.UserRepository();
const userService = new user_service_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return userController.getUsers(req, res, next);
});
router.get("/profile", authenticate_1.authenticate, (req, res, next) => {
    return userController.getProfile(req, res, next);
});
router.post("/register", (0, validate_1.validate)(register_1.registerSchema), (req, res, next) => {
    return userController.createUser(req, res, next);
});
router.post("/login", (0, validate_1.validate)(login_1.loginSchema), (req, res, next) => {
    return userController.loginUser(req, res, next);
});
router.post("/logout", authenticate_1.authenticate, (req, res, next) => {
    return userController.logoutUser(req, res, next);
});
router.post("/refresh-token", (req, res, next) => {
    return userController.refreshToken(req, res, next);
});
router.get("/feedback", authenticate_1.authenticate, (req, res, next) => {
    return userController.getFeedback(req, res, next);
});
router.post("/feedback", authenticate_1.authenticate, (req, res, next) => {
    return userController.updateFeedback(req, res, next);
});
exports.default = router;
