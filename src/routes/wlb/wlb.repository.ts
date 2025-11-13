import { prisma } from "@/utils/prisma";
import { UserProgress } from "./wlb.type";

export class WlbRepository {
  async getWlbUserToday(userId: number) {
    const today = new Date();
    try {
      return await prisma.userProgress.findUnique({
        where: {
          userId_date: {
            userId: userId,
            date: today,
          },
        },
        include: {
          dimensionalScores: true,
          recommendations: true,
        },
      });
    } catch (error) {
      console.error("Error fetching WLB user progress:", error);
      throw error;
    }
  }

  async getLatestWlbUser(userId: number) {
    try {
      return await prisma.userProgress.findFirst({
        where: { userId },
        orderBy: { date: "desc" },
        include: {
          dimensionalScores: true,
          recommendations: true,
        },
      });
    } catch (error) {
      console.error("Error fetching WLB user progress:", error);
      throw error;
    }
  }

  async getWlbUserHistory(userId: number) {
    try {
      return await prisma.userProgress.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        include: {
          dimensionalScores: true,
          recommendations: true,
        },
      });
    } catch (error) {
      console.error("Error fetching WLB user progress:", error);
      throw error;
    }
  }

  async saveAnalyzeWlbAnswer(data: UserProgress & { userId: number }) {
    try {
      const { dimensionalScores, recommendations, ...rest } = data as any;

      await prisma.userProgress.create({
        data: {
          ...rest,
          userId: data.userId,
          ...(dimensionalScores?.length
            ? { dimensionalScores: { create: dimensionalScores } }
            : {}),
          ...(recommendations?.length ? { recommendations: { create: recommendations } } : {}),
        },
      });
    } catch (error) {
      console.error("Error analyzing wlb:", error);
      throw error;
    }
  }

  async deleteUserProgress(userId: number) {
    try {
      const [deletedRecommendations, deletedDimensionalScores, deletedProgress] =
        await prisma.$transaction([
          prisma.recommendation.deleteMany({
            where: { userProgress: { userId } },
          }),
          prisma.dimensionalScore.deleteMany({
            where: { userProgress: { userId } },
          }),
          prisma.userProgress.deleteMany({
            where: { userId },
          }),
        ]);
      console.log(deletedProgress, "deleteeee");
      return {
        userId,
        deletedRecommendations: deletedRecommendations.count,
        deletedDimensionalScores: deletedDimensionalScores.count,
        deletedProgress: deletedProgress.count,
        message: "User progress and related data deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting user progress:", error);
      throw error;
    }
  }
}
