/*
  Warnings:

  - You are about to drop the column `initialScore` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `UserProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userProgressId,date]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `score` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProgressId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Progress" DROP COLUMN "initialScore",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "userProgressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserProgress" DROP COLUMN "progress";

-- CreateIndex
CREATE INDEX "Progress_date_idx" ON "public"."Progress"("date");

-- CreateIndex
CREATE INDEX "Progress_userProgressId_idx" ON "public"."Progress"("userProgressId");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_userProgressId_date_key" ON "public"."Progress"("userProgressId", "date");

-- AddForeignKey
ALTER TABLE "public"."Progress" ADD CONSTRAINT "Progress_userProgressId_fkey" FOREIGN KEY ("userProgressId") REFERENCES "public"."UserProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
