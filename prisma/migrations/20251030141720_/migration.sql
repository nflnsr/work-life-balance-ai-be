-- CreateEnum
CREATE TYPE "public"."QuestionnaireAnswer" AS ENUM ('sangat_setuju', 'kurang_setuju', 'netral', 'cukup_setuju', 'sangat_tidak_setuju');

-- CreateTable
CREATE TABLE "public"."Questionnaire" (
    "id" SERIAL NOT NULL,
    "question_1" "public"."QuestionnaireAnswer" NOT NULL,
    "question_2" "public"."QuestionnaireAnswer" NOT NULL,
    "question_3" "public"."QuestionnaireAnswer" NOT NULL,
    "question_4" "public"."QuestionnaireAnswer" NOT NULL,
    "question_5" "public"."QuestionnaireAnswer" NOT NULL,
    "question_6" "public"."QuestionnaireAnswer" NOT NULL,
    "question_7" "public"."QuestionnaireAnswer" NOT NULL,
    "question_8" "public"."QuestionnaireAnswer" NOT NULL,
    "question_9" "public"."QuestionnaireAnswer" NOT NULL,
    "question_10" "public"."QuestionnaireAnswer" NOT NULL,
    "question_11" "public"."QuestionnaireAnswer" NOT NULL,
    "question_12" "public"."QuestionnaireAnswer" NOT NULL,
    "question_13" "public"."QuestionnaireAnswer" NOT NULL,
    "question_14" "public"."QuestionnaireAnswer" NOT NULL,
    "question_15" "public"."QuestionnaireAnswer" NOT NULL,
    "question_16" "public"."QuestionnaireAnswer" NOT NULL,
    "question_17" "public"."QuestionnaireAnswer" NOT NULL,
    "question_18" "public"."QuestionnaireAnswer" NOT NULL,
    "question_19" "public"."QuestionnaireAnswer" NOT NULL,
    "question_20" "public"."QuestionnaireAnswer" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_userId_key" ON "public"."Questionnaire"("userId");

-- AddForeignKey
ALTER TABLE "public"."Questionnaire" ADD CONSTRAINT "Questionnaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
