"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireService = void 0;
class QuestionnaireService {
    questionnaireRepository;
    constructor(questionnaireRepository) {
        this.questionnaireRepository = questionnaireRepository;
    }
    async getQuestionnaires() {
        return await this.questionnaireRepository.getQuestionnaires();
    }
    async getQuestionnairesByUserId(auth) {
        return await this.questionnaireRepository.getQuestionnairesByUserId(auth);
    }
    async createQuestionnaireAnswer(data) {
        return await this.questionnaireRepository.createQuestionnaireAnswer(data);
    }
    async deleteQuestionnaireAnswer(userId) {
        return await this.questionnaireRepository.deleteQuestionnaireAnswer(userId);
    }
}
exports.QuestionnaireService = QuestionnaireService;
