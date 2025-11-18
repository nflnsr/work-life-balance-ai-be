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
}
