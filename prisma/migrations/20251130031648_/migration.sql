/*
  Warnings:

  - You are about to drop the column `feedbacks` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "feedbacks",
ADD COLUMN     "feedback" TEXT;
