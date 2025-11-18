"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChatByUserId(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const chat = await this.chatService.getChatByUserId(userId);
            res.status(200).json(chat);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createChat(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const data = req.body;
            const newChat = await this.chatService.createChat({ userId, ...data });
            res.status(201).json(newChat);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
}
exports.ChatController = ChatController;
