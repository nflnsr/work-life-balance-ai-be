-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "gender" TEXT,
ADD COLUMN     "isStudent" BOOLEAN NOT NULL DEFAULT true;
