import { Router, Request, Response, NextFunction } from "express";
// import { questionnaireenticate } from "~/middleware/questionnaireenticate";
import { QuestionnaireRepository } from "./questionnaire.repository";
import { QuestionnaireService } from "./questionnaire.service";
import { QuestionnaireController } from "./questionnaire.controller";
import { authenticate } from "@/middleware/authenticate";

const router = Router();

const questionnaireRepository = new QuestionnaireRepository();
const questionnaireService = new QuestionnaireService(questionnaireRepository);
const questionnaireController = new QuestionnaireController(questionnaireService);

router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return questionnaireController.getQuestionnaires(req, res, next);
});

router.get("/me", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return questionnaireController.getQuestionnairesByUserId(req, res, next);
});

router.post("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return questionnaireController.createQuestionnaireAnswer(req, res, next);
});

router.delete("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return questionnaireController.deleteQuestionnaireAnswer(req, res, next);
});

export default router;
