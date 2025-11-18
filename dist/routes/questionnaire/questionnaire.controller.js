"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireController = void 0;
const wlb_service_1 = require("../wlb/wlb.service");
const wlb_repository_1 = require("../wlb/wlb.repository");
class QuestionnaireController {
    questionnaireService;
    wlbService;
    constructor(questionnaireService) {
        this.questionnaireService = questionnaireService;
        const wlbRepository = new wlb_repository_1.WlbRepository();
        this.wlbService = new wlb_service_1.WlbService(wlbRepository);
    }
    async getQuestionnaires(req, res, next) {
        try {
            const questionnaire = await this.questionnaireService.getQuestionnaires();
            res.status(200).json(questionnaire);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async getQuestionnairesByUserId(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const questionnaire = await this.questionnaireService.getQuestionnairesByUserId({ userId });
            res.status(200).json(questionnaire);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createQuestionnaireAnswer(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const answers = req.body.answers;
            await this.questionnaireService.createQuestionnaireAnswer({
                userId,
                answers,
            });
            const wlbResult = await this.wlbService.analyzeAndSaveWlbAnswer({
                answers: answers,
                isStudent: false,
                userId,
            });
            res.status(201).json(wlbResult);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
    async deleteQuestionnaireAnswer(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const deletedQuestionnaire = await this.questionnaireService.deleteQuestionnaireAnswer(userId);
            res.status(200).json(deletedQuestionnaire);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
}
exports.QuestionnaireController = QuestionnaireController;
