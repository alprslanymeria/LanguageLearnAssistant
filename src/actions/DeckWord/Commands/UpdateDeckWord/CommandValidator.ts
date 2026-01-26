// IMPORTS
import { z } from "zod"
import { UPDATE_DECK_WORD_COMMAND } from "./Command"

export const UpdateDeckWordCommandValidator = z.object({

    type: z.literal(UPDATE_DECK_WORD_COMMAND),

    request: z.object({

      id: z
        .coerce
        .number()
        .int()
        .gt(0, {
          message: "ID MUST BE GREATER THAN 0"
        }),

      flashcardCategoryId: z
        .coerce
        .number()
        .int()
        .gt(0, {
          message: "FLASHCARD CATEGORY ID MUST BE GREATER THAN 0"
        }),

      question: z
        .string()
        .min(1, {
          message: "QUESTION IS REQUIRED"
        })
        .max(500, {
          message: "QUESTION MUST NOT EXCEED 500 CHARACTERS"
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
})