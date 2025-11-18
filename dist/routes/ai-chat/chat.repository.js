"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const prisma_1 = require("@/utils/prisma");
class ChatRepository {
    async getChatByUserId(userId) {
        try {
            return await prisma_1.prisma.chat.findMany({
                where: {
                    userId: userId,
                },
            });
        }
        catch (error) {
            console.error("Error fetching chat by user ID:", error);
            throw error;
        }
    }
    async createChat(data) {
        try {
            return await prisma_1.prisma.chat.create({
                data: {
                    userId: data.userId,
                    message: data.message,
                    answer: data.answer,
                },
            });
        }
        catch (error) {
            console.error("Error creating chat:", error);
            throw error;
        }
    }
}
exports.ChatRepository = ChatRepository;
