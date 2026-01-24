// IMPORTS
import { z } from "zod"
import { CREATE_DECK_WORD_COMMAND } from "./Command"

export const CreateDeckWordCommandValidator = z.object({
  
    type: z.literal(CREATE_DECK_WORD_COMMAND),

    request: z.object({

      flashcardCategoryId: z
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