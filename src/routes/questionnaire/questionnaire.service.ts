// import { Questionnaire, QuestionnaireItem } from "./questionnaire.type";
import { QuestionnaireAnswer } from "@prisma/client";
import { QuestionnaireRepository } from "./questionnaire.repository";

export class QuestionnaireService {
  private questionnaireRepository: QuestionnaireRepository;

  constructor(questionnaireRepository: QuestionnaireRepository) {
    this.questionnaireRepository = questionnaireRepository;
  }

  async getQuestionnaires() {
    return await this.questionnaireRepository.getQuestionnaires();
  }

  async getQuestionnairesByUserId(auth: any) {
    return await this.questionnaireRepository.getQuestionnairesByUserId(auth);
  }

  async createQuestionnaireAnswer(data: { userId: number; answers: QuestionnaireAnswer[] }) {
    return await this.questionnaireRepository.createQuestionnaireAnswer(data);
  }

  async deleteQuestionnaireAnswer(userId: number) {
    return await this.questionnaireRepository.deleteQuestionnaireAnswer(userId);
  }
}
