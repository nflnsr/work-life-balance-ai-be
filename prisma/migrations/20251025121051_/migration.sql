/*
  Warnings:

  - Made the column `category` on table `ScheduleItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."ScheduleItem" ADD COLUMN     "time" TIMESTAMP(3),
ALTER COLUMN "category" SET NOT NULL;
