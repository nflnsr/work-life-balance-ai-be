// import { prisma } from "@/utils/prisma";

import { prisma } from "@/utils/prisma";
import { UserProgress } from "./gemini.type";

export class GeminiRepository {
  async saveAnalyzeWlbAnswer(data: UserProgress & { userId: number }) {
    try {
      // destructure relational arrays so we can use nested create inputs for Prisma
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
      console.error("Error analyzing gemini:", error);
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
