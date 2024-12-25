import { z, ZodType } from "zod";

export const validateTodo: ZodType = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
