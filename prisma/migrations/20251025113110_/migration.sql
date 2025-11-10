/*
  Warnings:

  - You are about to drop the column `content` on the `ScheduleItem` table. All the data in the column will be lost.
  - Added the required column `desc` to the `ScheduleItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('personal_time', 'work_activity', 'self_development');

-- AlterTable
ALTER TABLE "public"."ScheduleItem" DROP COLUMN "content",
ADD COLUMN     "category" "public"."Category",
ADD COLUMN     "desc" TEXT NOT NULL;
