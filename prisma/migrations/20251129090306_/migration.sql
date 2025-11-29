/*
  Warnings:

  - You are about to drop the column `quota` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "quota";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "chatQuota" INTEGER NOT NULL DEFAULT 8;
