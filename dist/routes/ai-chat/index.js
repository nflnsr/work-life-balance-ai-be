"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_service_1 = require("./chat.service");
const chat_repository_1 = require("./chat.repository");
const chat_controller_1 = require("./chat.controller");
const authenticate_1 = require("@/middleware/authenticate");
const router = (0, express_1.Router)();
const chatRepository = new chat_repository_1.ChatRepository();
const chatService = new chat_service_1.ChatService(chatRepository);
const chatController = new chat_controller_1.ChatController(chatService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return chatController.getChatByUserId(req, res, next);
});
router.post("/", authenticate_1.authenticate, (req, res, next) => {
    return chatController.createChat(req, res, next);
});
exports.default = router;
