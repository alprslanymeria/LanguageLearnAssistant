// IMPORTS
import { z } from "zod"
import { CREATE_RROWS_COMMAND } from "./Command"

export const ReadingRowItemRequestValidator = z.object({

    selectedSentence: z
        .string()
        .min(1, {
            message: "SELECTED SENTENCE IS REQUIRED."
        })
        .max(1000, {
            message: "SELECTED SENTENCE MUST NOT EXCEED 1000 CHARACTERS."
        }),

    answer: z
        .string()
        .min(1, {
            message: "ANSWER IS REQUIRED."
        })
        .max(500, {
            message: "ANSWER MUST NOT EXCEED 500 CHARACTERS."
        }),

    answerTranslate: z
        .string()
        .min(1, {
            message: "ANSWER TRANSLATE IS REQUIRED."
        })
        .max(500, {
            message: "ANSWER TRANSLATE MUST NOT EXCEED 500 CHARACTERS."
        }),

    similarity: z
      .number()
      .min(0, {
        message: "SIMILARITY MUST BE BETWEEN 0 AND 100"
      })
      .max(100, {
        message: "SIMILARITY MUST BE BETWEEN 0 AND 100"
      })
})

export const CreateRRowsCommandValidator = z.object({

  type: z.literal(CREATE_RROWS_COMMAND),

  request: z.object({

    readingOldSessionId: z
      .string()
      .min(1, {
        message: "READING OLD SESSION ID IS REQUIRED."
      }),

    rows: z
      .array(ReadingRowItemRequestValidator)
      .min(1, {
        message: "AT LEAST ONE ROW IS REQUIRED."
      })
      
  })

})