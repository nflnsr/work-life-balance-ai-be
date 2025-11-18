/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_chatId_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "answer" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Message";
