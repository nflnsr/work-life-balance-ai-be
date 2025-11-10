/*
  Warnings:

  - You are about to drop the `DimentionalScore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DimentionalScore" DROP CONSTRAINT "DimentionalScore_userProgressId_fkey";

-- DropTable
DROP TABLE "public"."DimentionalScore";

-- CreateTable
CREATE TABLE "public"."DimensionalScore" (
    "id" SERIAL NOT NULL,
    "dimension" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "analysis" TEXT NOT NULL,
    "userProgressId" INTEGER NOT NULL,

    CONSTRAINT "DimensionalScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DimensionalScore" ADD CONSTRAINT "DimensionalScore_userProgressId_fkey" FOREIGN KEY ("userProgressId") REFERENCES "public"."UserProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
