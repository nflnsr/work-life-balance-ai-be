import { z } from "zod";

export const questionnaireAnswerSchema = z.object({
  isStudent: z.boolean(),
  answer: z.array(
    z.enum(["SANGAT_SETUJU", "KURANG_SETUJU", "NETRAL", "CUKUP_SETUJU", "SANGAT_TIDAK_SETUJU"])
  ),
});

export type QuestionnaireAnswerFormType = z.infer<typeof questionnaireAnswerSchema>;
