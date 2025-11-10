import { Request, Response, NextFunction } from "express";
import { QuestionnaireService } from "./questionnaire.service";
import { GeminiService } from "../gemini/gemini.service";
import { GeminiRepository } from "../gemini/gemini.repository";


export class QuestionnaireController {
  private questionnaireService: QuestionnaireService;
  private geminiService: GeminiService;

  constructor(questionnaireService: QuestionnaireService) {
    this.questionnaireService = questionnaireService;
    const geminiRepository = new GeminiRepository();
    this.geminiService = new GeminiService(geminiRepository);
  }

  async getQuestionnaires(req: Request, res: Response, next: NextFunction) {
    try {
      const questionnaire = await this.questionnaireService.getQuestionnaires();

      res.status(200).json(questionnaire);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async getQuestionnairesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const questionnaire = await this.questionnaireService.getQuestionnairesByUserId({ userId });
      res.status(200).json(questionnaire);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async createQuestionnaireAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const answers = req.body.answers;

      console.log("userId:", userId, "answers:", answers);
      const newQuestionnaire = await this.questionnaireService.createQuestionnaireAnswer({ userId, answers });

      const wlbResult = await this.geminiService.analyzeWlbAnswer({
        answers: answers,
        isStudent: false,
        userId,
      });
      console.log(wlbResult, "wlb result");
      console.log("New questionnaire created successfully:", newQuestionnaire);
      res.status(201).json(wlbResult);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      
      res.status(500).json({ error: errorMessage });
      return;
    }
  }

  async deleteQuestionnaireAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const deletedQuestionnaire = await this.questionnaireService.deleteQuestionnaireAnswer(userId);

      res.status(200).json(deletedQuestionnaire);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}