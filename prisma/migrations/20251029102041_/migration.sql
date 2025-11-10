/*
  Warnings:

  - Made the column `time` on table `ScheduleItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."ScheduleItem" ALTER COLUMN "time" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "hasAnsweredQuestionnaire" BOOLEAN NOT NULL DEFAULT false;
