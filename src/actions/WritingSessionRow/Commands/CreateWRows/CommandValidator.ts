// IMPORTS
import { z } from "zod"
import { CREATE_WROWS_COMMAND } from "./Command"

export const WritingRowItemRequestValidator = z.object({

    selectedSentence: z
        .string()
        .min(1, {
        message: "SELECTED SENTENCE IS REQUIRED."
        })
        .max(2000, {
        message: "SELECTED SENTENCE MUST NOT EXCEED 2000 CHARACTERS."
        }),

    answer: z
        .string()
        .min(1, {
        message: "ANSWER IS REQUIRED."
        })
        .max(2000, {
        message: "ANSWER MUST NOT EXCEED 2000 CHARACTERS."
        }),

    answerTranslate: z
        .string()
        .min(1, {
        message: "ANSWER TRANSLATE IS REQUIRED."
        })
        .max(2000, {
        message: "ANSWER TRANSLATE MUST NOT EXCEED 2000 CHARACTERS."
        }),

    similarity: z
        .number()
        .min(0, {
        message: "SIMILARITY MUST BE BETWEEN 0 AND 100."
        })
        .max(100, {
        message: "SIMILARITY MUST BE BETWEEN 0 AND 100."
        })
})

export const CreateWRowsCommandValidator = z.object({

    type: z.literal(CREATE_WROWS_COMMAND),

    request: z.object({

      writingOldSessionId: z
        .string()
        .min(1, {
          message: "WRITING OLD SESSION ID IS REQUIRED."
        }),

      rows: z
        .array(WritingRowItemRequestValidator)
        .min(1, {
          message: "AT LEAST ONE ROW IS REQUIRED."
        })
    })
})