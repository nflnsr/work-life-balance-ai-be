import { prisma } from "@/utils/prisma";
export class ChatRepository {
  async getChatByUserId(userId: number) {
    try {
      return await prisma.chat.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      console.error("Error fetching chat by user ID:", error);
      throw error;
    }
  }

  async createChat(data: { userId: number; message: string; answer: string }) {
    try {
      await prisma.user.update({
        where: { id: data.userId },
        data: { chatQuota: { decrement: 1 } },
      });
      return await prisma.chat.create({
        data: {
          userId: data.userId,
          message: data.message,
          answer: data.answer,
        },
      });
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  async getChatQuota(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { chatQuota: true },
      });
      return user ? user.chatQuota : null;
    } catch (error) {
      console.error("Error fetching chat quota:", error);
      throw error;
    }
  }

  async updateChatQuota(userId: number, newQuota: number = 8) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { chatQuota: newQuota },
      });
    } catch (error) {
      console.error("Error updating chat quota:", error);
      throw error;
    }
  }
}
