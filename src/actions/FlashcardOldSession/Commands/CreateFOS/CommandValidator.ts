// IMPORTS
import { z } from "zod"
import { CREATE_FOS_COMMAND } from "./Command"

export const CreateFOSCommandValidator = z.object({

  type: z.literal(CREATE_FOS_COMMAND),
  
  request: z.object({

    id: z
      .string()
      .min(1, {
        message: "ID IS REQUIRED"
      }),

    flashcardId: z
      .number()
      .int()
      .gt(0, {
        message: "FLASHCARD ID MUST BE GREATER THAN 0."
      }),

    flashcardCategoryId: z
      .number()
      .int()
      .gt(0, {
        message: "FLASHCARD CATEGORY ID MUST BE GREATER THAN 0."
      }),

    rate: z
      .number()
      .min(0, {
        message: "RATE MUST BE BETWEEN 0 AND 100."
      })
      .max(100, {
        message: "RATE MUST BE BETWEEN 0 AND 100."
      })

  })
  
})