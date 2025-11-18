"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireRepository = void 0;
const prisma_1 = require("@/utils/prisma");
class QuestionnaireRepository {
    async getQuestionnaires() {
        try {
            return await prisma_1.prisma.questionnaire.findMany();
        }
        catch (error) {
            console.error("Error fetching questionnaires:", error);
            throw error;
        }
    }
    async getQuestionnairesByUserId(user) {
        try {
            const questionnaires = await prisma_1.prisma.questionnaire.findMany({
                where: {
                    userId: user.userId,
                },
            });
            return questionnaires;
        }
        catch (error) {
            console.error("Error fetching questionnaires by user:", error);
            throw error;
        }
    }
    async createQuestionnaireAnswer(data) {
        try {
            const newQuestionnaire = await prisma_1.prisma.questionnaire.create({
                data: {
                    userId: data.userId,
                    answer: data.answers,
                },
            });
            await prisma_1.prisma.user.update({
                where: { id: data.userId },
                data: {
                    questionnaire: { connect: { id: newQuestionnaire.id } },
                    hasAnsweredQuestionnaire: true,
                },
            });
            return newQuestionnaire;
        }
        catch (error) {
            console.error("Error creating questionnaire:", error);
            throw error;
        }
    }
    async deleteQuestionnaireAnswer(userId) {
        try {
            const deletedQuestionnaire = await prisma_1.prisma.questionnaire.deleteMany({
                where: { userId },
            });
            const updatedUser = await prisma_1.prisma.user.update({
                where: { id: userId },
                data: { hasAnsweredQuestionnaire: false },
            });
            return {
                success: true,
                message: "Questionnaire deleted and user status updated.",
                deletedCount: deletedQuestionnaire.count,
                user: updatedUser,
            };
        }
        catch (error) {
            console.error("Error deleting questionnaire:", error);
            throw error;
        }
    }
}
exports.QuestionnaireRepository = QuestionnaireRepository;
