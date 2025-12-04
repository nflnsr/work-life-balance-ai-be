import cron from "node-cron";
import { ChatService } from "@/routes/ai-chat/chat.service";
import { ChatRepository } from "@/routes/ai-chat/chat.repository";
import { UserService } from "@/routes/user/user.service";
import { UserRepository } from "@/routes/user/user.repository";

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

cron.schedule(
  "20 00 * * *",
  async () => {
    try {
      const userIds = await userService.getUsersId();
      for (const user of userIds) {
        await chatService.updateChatQuota(user.id, 8);
        console.log(`Updated chat quota for user ${user.id}`);
      }
    } catch (error) {
      console.error("Error during Chat quota update job:", error);
    }
  },
  {
    timezone: "Asia/Jakarta",
  }
);
