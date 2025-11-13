import { Request, Response, NextFunction } from "express";
import { WlbService } from "./wlb.service";
import { UserProgress } from "./wlb.type";
import { QuestionnaireAnswer } from "../questionnaire/questionnaire.type";

export class WlbController {
  private wlbService: WlbService;

  constructor(wlbService: WlbService) {
    this.wlbService = wlbService;
  }

  async getWlbUserToday(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.user?.id);
    try {
      const userProgress = await this.wlbService.getWlbUserToday(userId);
      return res.status(200).json(userProgress);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ error: errorMessage });
    }
  }

  async getLatestWlbUser(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.user?.id);
    try {
      const userProgress = await this.wlbService.getLatestWlbUser(userId);
      return res.status(200).json(userProgress);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ error: errorMessage });
    }
  }

  async getWlbUserHistory(req: Request, res: Response, next: NextFunction) {
    const userId = Number(req.user?.id);
    try {
      const userProgressHistory = await this.wlbService.getWlbUserHistory(userId);
      return res.status(200).json(userProgressHistory);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ error: errorMessage });
    }
  }

  async analyzeWlbAnswers(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const answers: QuestionnaireAnswer[] = body?.answers;
    const isStudent = body?.isStudent || false;
    const userId = Number(req.user?.id);

    const result: UserProgress = await this.wlbService.analyzeWlbAnswer({
      answers,
      isStudent,
      userId,
    });
    return res.status(200).json(result);
  }

  deleteUserProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const deletedProgress = this.wlbService.deleteUserProgress(userId);
      res.status(200).json(deletedProgress);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}
