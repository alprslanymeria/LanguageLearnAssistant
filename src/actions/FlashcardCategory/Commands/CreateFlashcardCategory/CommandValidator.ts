// IMPORTS
import { z } from "zod"

export const createFlashcardCategoryCommandValidator = z.object({

  categoryName: z
    .string()
    .min(1, {
      message: "CATEGORY NAME IS REQUIRED"
    })
    .max(200, {
      message: "CATEGORY NAME MUST NOT EXCEED 200 CHARACTERS"
    }),
  
  practice: z
    .string()
    .min(1, {
      message: "PRACTICE IS REQUIRED"
    }),

  userId: z
    .string()
    .min(1, {
      message: "USER ID IS REQUIRED"
    }),

  languageId: z
    .coerce
    .number()
    .int()
    .gt(0, {
      message: "LANGUAGE ID MUST BE GREATER THAN 0"
    })
    
})