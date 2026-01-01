"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WlbRepository = void 0;
const prisma_1 = require("@/utils/prisma");
class WlbRepository {
    async getWlbUserToday(userId) {
        try {
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));
            const result = await prisma_1.prisma.userProgress.findFirst({
                where: {
                    userId,
                    date: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                include: {
                    dimensionalScores: true,
                    recommendations: true,
                },
            });
            return result;
        }
        catch (error) {
            console.error("Error fetching WLB user progress:", error);
            throw error;
        }
    }
    async getLatestWlbUser(userId) {
        try {
            const data = await prisma_1.prisma.userProgress.findFirst({
                where: { userId },
                orderBy: { date: "desc" },
                include: {
                    dimensionalScores: true,
                    recommendations: true,
                },
            });
            if (!data)
                return null;
            const priorityOrder = {
                High: 1,
                Medium: 2,
                Low: 3,
            };
            data.recommendations = data.recommendations.sort((a, b) => {
                if (a.checked !== b.checked) {
                    return a.checked ? 1 : -1;
                }
                const keyA = a.priority;
                const keyB = b.priority;
                return priorityOrder[keyA] - priorityOrder[keyB];
            });
            return data;
        }
        catch (error) {
            console.error("Error fetching WLB user progress:", error);
            throw error;
        }
    }
    async getUsersByRecalculateProgress(recalculateFlag) {
        try {
            const users = await prisma_1.prisma.user.findMany({
                where: {
                    ...(recalculateFlag !== undefined && {
                        recalculateProgress: recalculateFlag,
                    }),
                },
                select: { id: true, name: true, email: true },
            });
            return users;
        }
        catch (error) {
            console.error("Error fetching WLB users for recalculation:", error);
            throw error;
        }
    }
    async getWlbUserHistory(userId) {
        try {
            const result = await prisma_1.prisma.userProgress.findMany({
                where: { userId },
                orderBy: { date: "asc" },
                include: {
                    dimensionalScores: true,
                    recommendations: true,
                },
            });
            return result;
        }
        catch (error) {
            console.error("Error fetching WLB user progress:", error);
            throw error;
        }
    }
    async updateRecalculateProgressFlag(userId, flag) {
        return await prisma_1.prisma.user.update({
            where: { id: userId },
            data: { recalculateProgress: flag },
        });
    }
    async updateRecommendationStatus(userId, recommendationId) {
        await this.updateRecalculateProgressFlag(userId, true);
        return await prisma_1.prisma.recommendation.updateMany({
            where: {
                id: recommendationId,
                userProgress: {
                    userId,
                },
            },
            data: {
                checked: true,
            },
        });
    }
    async saveAnalyzeWlbAnswer(data) {
        try {
            const localDate = new Date();
            localDate.setHours(0, 0, 0, 0);
            // localDate.setDate(localDate.getDate());
            return await prisma_1.prisma.userProgress.create({
                data: {
                    score: data.score,
                    summary: data.summary,
                    userId: data.userId,
                    date: localDate,
                    dimensionalScores: {
                        create: data.dimensionalScores?.map(({ dimension, score, analysis }) => ({
                            dimension,
                            score,
                            analysis,
                        })),
                    },
                    recommendations: {
                        create: data.recommendations?.map(({ priority, title, description }) => ({
                            priority,
                            title,
                            description,
                        })),
                    },
                },
            });
        }
        catch (error) {
            if (error?.code === "P2002") {
                console.error("Duplicate progress entry detected for same day:", error.meta);
            }
            else {
                console.error("Error analyzing WLB:", error);
            }
            throw error;
        }
    }
    async deleteUserProgress(userId) {
        try {
            const [deletedRecommendations, deletedDimensionalScores, deletedProgress] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.recommendation.deleteMany({
                    where: { userProgress: { userId } },
                }),
                prisma_1.prisma.dimensionalScore.deleteMany({
                    where: { userProgress: { userId } },
                }),
                prisma_1.prisma.userProgress.deleteMany({
                    where: { userId },
                }),
            ]);
            return {
                userId,
                deletedRecommendations: deletedRecommendations.count,
                deletedDimensionalScores: deletedDimensionalScores.count,
                deletedProgress: deletedProgress.count,
                message: "User progress and related data deleted successfully",
            };
        }
        catch (error) {
            console.error("Error deleting user progress:", error);
            throw error;
        }
    }
    async insertLatestWlbProgress(userId) {
        try {
            const lastProgress = await this.getLatestWlbUser(userId);
            const { id, date, userId: user_id, createdAt, updatedAt, ...progressData } = lastProgress;
            const localDate = new Date();
            localDate.setHours(0, 0, 0, 0);
            localDate.setDate(localDate.getDate() + 2);
            return await prisma_1.prisma.userProgress.create({
                data: {
                    score: progressData.score,
                    summary: progressData.summary,
                    userId,
                    date: localDate,
                    dimensionalScores: progressData.dimensionalScores
                        ? {
                            create: progressData.dimensionalScores.map(({ dimension, score, analysis }) => ({
                                dimension,
                                score,
                                analysis,
                            })),
                        }
                        : undefined,
                    recommendations: progressData.recommendations
                        ? {
                            create: progressData.recommendations.map(({ priority, title, description, checked }) => ({
                                priority,
                                title,
                                description,
                                checked,
                            })),
                        }
                        : undefined,
                },
            });
        }
        catch (error) {
            console.error("Error inserting latest WLB progress:", error);
            throw error;
        }
    }
}
exports.WlbRepository = WlbRepository;
