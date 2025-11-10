import { z } from "zod";

export const scheduleItemSchema = z.object({
  desc: z.string().min(1, "Description is required"),
  time: z.union([z.string(), z.date()]).transform(v => new Date(v)),
  looping: z.enum(["EVERYDAY", "WEEKDAYS", "WEEKENDS"]).optional().nullable(),
  category: z.enum(["WORK_ACTIVITY", "PERSONAL_TIME", "SELF_DEVELOPMENT"]),
});

export type ScheduleItemFormType = z.infer<typeof scheduleItemSchema>;
