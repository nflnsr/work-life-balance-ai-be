import { prisma } from "@/utils/prisma";
import { UserProgress } from "./wlb.type";

export class WlbRepository {
  async getWlbUserToday(userId: number) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const result = await prisma.userProgress.findFirst({
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
    } catch (error) {
      console.error("Error fetching WLB user progress:", error);
      throw error;
    }
  }

  async getLatestWlbUser(userId: number) {
    try {
      const data = await prisma.userProgress.findFirst({
        where: { userId },
        orderBy: { date: "desc" },
        include: {
          dimensionalScores: true,
          recommendations: true,
        },
      });

      if (!data) return null;

      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      } as const;

      data.recommendations = data.recommendations.sort((a, b) => {
        if (a.checked !== b.checked) {
          return a.checked ? 1 : -1;
        }

        const keyA = a.priority as keyof typeof priorityOrder;
        const keyB = b.priority as keyof typeof priorityOrder;

        return priorityOrder[keyA] - priorityOrder[keyB];
      });

      return data;
    } catch (error) {
      console.error("Error fetching WLB user progress:", error);
      throw error;
    }
  }

  async getWlbUserHistory(userId: number) {
    try {
      const result = await prisma.userProgress.findMany({
        where: { userId },
        orderBy: { date: "asc" },
        include: {
          dimensionalScores: true,
          recommendations: true,
        },
      });
      return result;
    } catch (error) {
      console.error("Error fetching WLB user progress:", error);
      throw error;
    }
  }

  async updateRecommendationStatus(userId: number, recommendationId: number) {
    return await prisma.recommendation.updateMany({
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

 async saveAnalyzeWlbAnswer(data: UserProgress & { userId: number }) { 
  try {
    const localDate = new Date();
    localDate.setHours(0, 0, 0, 0);
    localDate.setDate(localDate.getDate() + 2);

    return await prisma.userProgress.create({
      data: {
        score: data.score,
        summary: data.summary,
        userId: data.userId,
        date: localDate,
        dimensionalScores: {
          create: data.dimensionalScores?.map(({dimension, score, analysis}) => ({ dimension, score, analysis }))
        },
        recommendations: {
          create: data.recommendations?.map(({priority, title, description}) => ({ priority, title, description }))
        }
      }
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      console.error("Duplicate progress entry detected for same day:", error.meta);
    } else {
      console.error("Error analyzing WLB:", error);
    }
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
