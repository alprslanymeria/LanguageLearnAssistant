// IMPORTS
import { z } from "zod"

export const CreateDeckWordCommandValidator = z.object({
  
    categoryId: z
      .coerce
      .number()
      .int()
      .gt(0, {
        message: "CATEGORY ID MUST BE GREATER THAN 0"
      }),

    word: z
      .string()
      .min(1, {
        message: "WORD IS REQUIRED"
      })
      .max(500, {
        message: "WORD MUST NOT EXCEED 500 CHARACTERS"
      }),

    answer: z
      .string()
      .min(1, {
        message: "ANSWER IS REQUIRED"
      })
      .max(500, {
        message: "ANSWER MUST NOT EXCEED 500 CHARACTERS"
      })
})