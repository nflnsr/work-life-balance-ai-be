import { Router, Request, Response, NextFunction } from "express";
// import { geminienticate } from "~/middleware/geminienticate";
import { GeminiRepository } from "./gemini.repository";
import { GeminiService } from "./gemini.service";
import { GeminiController } from "./gemini.controller";
import { authenticate } from "@/middleware/authenticate";

const router = Router();

const geminiRepository = new GeminiRepository();
const geminiService = new GeminiService(geminiRepository);
const geminiController = new GeminiController(geminiService);

// router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
//   return geminiController.getGeminis(req, res, next);
// });

// router.get("/me", authenticate, (req: Request, res: Response, next: NextFunction) => {
//   return geminiController.getGeminisByUserId(req, res, next);
// });

router.post("/analyze", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return geminiController.analyzeWlbAnswers(req, res, next);
});

router.delete("/progress", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return geminiController.deleteUserProgress(req, res, next);
});

export default router;
