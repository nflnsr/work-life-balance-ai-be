import { Router } from "express";
import { ChatService } from "./chat.service";
import { ChatRepository } from "./chat.repository";
import { ChatController } from "./chat.controller";
import { authenticate } from "@/middleware/authenticate";

const router = Router();

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository);
const chatController = new ChatController(chatService);

router.get("/", authenticate, (req, res, next) => {
  return chatController.getChatByUserId(req, res, next);
});

router.get("/quota", authenticate, (req, res, next) => {
  return chatController.getChatQuota(req, res, next);
});

router.post("/", authenticate, (req, res, next) => {
  return chatController.createChat(req, res, next);
});

export default router;
