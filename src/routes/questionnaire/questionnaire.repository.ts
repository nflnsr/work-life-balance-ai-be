import { prisma } from "@/utils/prisma";
import { QuestionnaireAnswer } from "@prisma/client";

export class QuestionnaireRepository {
  async getQuestionnaires() {
    try {
      return await prisma.questionnaire.findMany();
    } catch (error) {
      console.error("Error fetching questionnaires:", error);
      throw error;
    }
  }

  async getQuestionnairesByUserId(user: any) {
    try {
      const questionnaires = await prisma.questionnaire.findMany({
        where: {
          userId: user.userId,
        },
      });
      return questionnaires;
    } catch (error) {
      console.error("Error fetching questionnaires by user:", error);
      throw error;
    }
  }

  async createQuestionnaireAnswer(data: {
    userId: number;
    answers: QuestionnaireAnswer[];
  }) {
    try {
      const newQuestionnaire = await prisma.questionnaire.create({
        data: {
          userId: data.userId,
          answer: data.answers,
        },
      });

      await prisma.user.update({
        where: { id: data.userId },
        data: {
          questionnaire: { connect: { id: newQuestionnaire.id } },
          hasAnsweredQuestionnaire: true,
        },
      });
      return newQuestionnaire;
    } catch (error) {
      console.error("Error creating questionnaire:", error);
      throw error;
    }
  }

  async deleteQuestionnaireAnswer(userId: number) {
    try {
      const deletedQuestionnaire = await prisma.questionnaire.deleteMany({
        where: {
          userId: userId,
        },
      });
      return deletedQuestionnaire;
    } catch (error) {
      console.error("Error deleting questionnaire:", error);
      throw error;
    }
  }
}