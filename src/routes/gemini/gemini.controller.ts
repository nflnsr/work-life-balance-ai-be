import { Request, Response, NextFunction } from "express";
import { GeminiService } from "./gemini.service";
import { UserProgress } from "./gemini.type";
import { QuestionnaireAnswer } from "../questionnaire/questionnaire.type";

export class GeminiController {
  private geminiService: GeminiService;

  constructor(geminiService: GeminiService) {
    this.geminiService = geminiService;
  }

  async analyzeWlbAnswers(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const answers: QuestionnaireAnswer[] = body?.answers;
    const isStudent = body?.isStudent || false;
    const userId = Number(req.user?.id);

    const result: UserProgress = await this.geminiService.analyzeWlbAnswer({
      answers,
      isStudent,
      userId
  });
    return res.status(200).json(result);
  }

  deleteUserProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const deletedProgress = this.geminiService.deleteUserProgress(userId);
      res.status(200).json(deletedProgress);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}