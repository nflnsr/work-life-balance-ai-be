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
            await prisma_1.prisma.user.update({
                where: { id: data.userId },
                data: { chatQuota: { decrement: 1 } },
            });
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
    async getChatQuota(userId) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
                select: { chatQuota: true },
            });
            return user ? user.chatQuota : null;
        }
        catch (error) {
            console.error("Error fetching chat quota:", error);
            throw error;
        }
    }
    async updateChatQuota(userId, newQuota = 8) {
        try {
            return await prisma_1.prisma.user.update({
                where: { id: userId },
                data: { chatQuota: newQuota },
            });
        }
        catch (error) {
            console.error("Error updating chat quota:", error);
            throw error;
        }
    }
}
exports.ChatRepository = ChatRepository;
