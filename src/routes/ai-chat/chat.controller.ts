import { ChatService } from "./chat.service";
import { Request, Response, NextFunction } from "express";

export class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  async getChatByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const chat = await this.chatService.getChatByUserId(userId);
      res.status(200).json(chat);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async getChatQuota(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const quota = await this.chatService.getChatQuota(userId);
      res.status(200).json({ chatQuota: quota });
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const data = req.body;
      const newChat = await this.chatService.createChat({ userId, ...data });
      res.status(201).json(newChat);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }
}
