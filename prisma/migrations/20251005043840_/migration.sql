/*
  Warnings:

  - You are about to drop the column `pekerjaan` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "pekerjaan",
ADD COLUMN     "field" TEXT;
