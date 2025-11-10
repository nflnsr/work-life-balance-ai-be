/*
  Warnings:

  - You are about to drop the column `checkedRecommendationIds` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the column `currentScore` on the `UserProgress` table. All the data in the column will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `score` to the `UserProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Progress" DROP CONSTRAINT "Progress_userProgressId_fkey";

-- DropIndex
DROP INDEX "public"."UserProgress_userId_key";

-- AlterTable
ALTER TABLE "public"."UserProgress" DROP COLUMN "checkedRecommendationIds",
DROP COLUMN "currentScore",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Progress";

-- CreateTable
CREATE TABLE "public"."Recommendation" (
    "id" SERIAL NOT NULL,
    "priority" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "userProgressId" INTEGER NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DimentionalScore" (
    "id" SERIAL NOT NULL,
    "dimension" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "analysis" TEXT NOT NULL,
    "userProgressId" INTEGER NOT NULL,

    CONSTRAINT "DimentionalScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserProgress_date_idx" ON "public"."UserProgress"("date");

-- CreateIndex
CREATE INDEX "UserProgress_userId_idx" ON "public"."UserProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_date_key" ON "public"."UserProgress"("userId", "date");

-- AddForeignKey
ALTER TABLE "public"."Recommendation" ADD CONSTRAINT "Recommendation_userProgressId_fkey" FOREIGN KEY ("userProgressId") REFERENCES "public"."UserProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DimentionalScore" ADD CONSTRAINT "DimentionalScore_userProgressId_fkey" FOREIGN KEY ("userProgressId") REFERENCES "public"."UserProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
