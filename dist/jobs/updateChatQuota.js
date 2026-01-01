"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const chat_service_1 = require("@/routes/ai-chat/chat.service");
const chat_repository_1 = require("@/routes/ai-chat/chat.repository");
const user_service_1 = require("@/routes/user/user.service");
const user_repository_1 = require("@/routes/user/user.repository");
const chatRepository = new chat_repository_1.ChatRepository();
const chatService = new chat_service_1.ChatService(chatRepository);
const userRepository = new user_repository_1.UserRepository();
const userService = new user_service_1.UserService(userRepository);
node_cron_1.default.schedule("00 01 * * *", async () => {
    try {
        const userIds = await userService.getUsersId();
        for (const user of userIds) {
            await chatService.updateChatQuota(user.id, 8);
            console.log(`Updated chat quota for user ${user.id}`);
        }
    }
    catch (error) {
        console.error("Error during Chat quota update job:", error);
    }
}, {
    timezone: "Asia/Jakarta",
});
