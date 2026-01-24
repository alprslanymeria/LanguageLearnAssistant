// IMPORTS
import { z } from "zod"
import { CREATE_FLASHCARD_CATEGORY_COMMAND } from "./Command"

export const createFlashcardCategoryCommandValidator = z.object({

    type: z.literal(CREATE_FLASHCARD_CATEGORY_COMMAND),

    request: z.object({

      flashcardId: z
        .number()
        .int()
        .gt(0, {
          message: "FLASHCARD ID MUST BE GREATER THAN 0"
        }),

      name: z
        .string()
        .min(1, {
          message: "NAME IS REQUIRED"
        })
        .max(200, {
          message: "NAME MUST NOT EXCEED 200 CHARACTERS"
        }),

      userId: z
        .string()
        .min(1, {
          message: "USER ID IS REQUIRED"
        }),

      languageId: z
        .number()
        .int()
        .gt(0, {
          message: "LANGUAGE ID MUST BE GREATER THAN 0"
        })

    })
    
})