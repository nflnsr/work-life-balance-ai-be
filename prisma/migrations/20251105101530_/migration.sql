/*
  Warnings:

  - You are about to drop the column `question_1` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_10` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_11` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_12` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_13` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_14` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_15` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_16` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_17` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_18` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_19` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_2` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_20` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_3` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_4` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_5` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_6` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_7` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_8` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `question_9` on the `Questionnaire` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Questionnaire" DROP COLUMN "question_1",
DROP COLUMN "question_10",
DROP COLUMN "question_11",
DROP COLUMN "question_12",
DROP COLUMN "question_13",
DROP COLUMN "question_14",
DROP COLUMN "question_15",
DROP COLUMN "question_16",
DROP COLUMN "question_17",
DROP COLUMN "question_18",
DROP COLUMN "question_19",
DROP COLUMN "question_2",
DROP COLUMN "question_20",
DROP COLUMN "question_3",
DROP COLUMN "question_4",
DROP COLUMN "question_5",
DROP COLUMN "question_6",
DROP COLUMN "question_7",
DROP COLUMN "question_8",
DROP COLUMN "question_9",
ADD COLUMN     "answer" "public"."QuestionnaireAnswer"[];

-- CreateTable
CREATE TABLE "public"."UserProgress" (
    "id" SERIAL NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "currentScore" INTEGER NOT NULL DEFAULT 0,
    "checkedRecommendationIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Progress" (
    "id" SERIAL NOT NULL,
    "initialScore" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_key" ON "public"."UserProgress"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
