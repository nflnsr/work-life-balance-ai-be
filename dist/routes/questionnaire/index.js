"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { questionnaireenticate } from "~/middleware/questionnaireenticate";
const questionnaire_repository_1 = require("./questionnaire.repository");
const questionnaire_service_1 = require("./questionnaire.service");
const questionnaire_controller_1 = require("./questionnaire.controller");
const authenticate_1 = require("@/middleware/authenticate");
const router = (0, express_1.Router)();
const questionnaireRepository = new questionnaire_repository_1.QuestionnaireRepository();
const questionnaireService = new questionnaire_service_1.QuestionnaireService(questionnaireRepository);
const questionnaireController = new questionnaire_controller_1.QuestionnaireController(questionnaireService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return questionnaireController.getQuestionnaires(req, res, next);
});
router.get("/me", authenticate_1.authenticate, (req, res, next) => {
    return questionnaireController.getQuestionnairesByUserId(req, res, next);
});
router.post("/", authenticate_1.authenticate, (req, res, next) => {
    return questionnaireController.createQuestionnaireAnswer(req, res, next);
});
router.delete("/", authenticate_1.authenticate, (req, res, next) => {
    return questionnaireController.deleteQuestionnaireAnswer(req, res, next);
});
exports.default = router;
