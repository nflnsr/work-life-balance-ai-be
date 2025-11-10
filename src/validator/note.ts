import { z } from "zod";

export const noteItemSchema = z.object({
  content: z.string().min(1, "Content is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
});



export type NoteFormType = z.infer<typeof noteItemSchema>;
