// IMPORTS
import { z } from "zod"
import { CREATE_FROWS_COMMAND } from "./Command"

export const FlashcardRowItemRequestValidator = z.object({

    question: z
        .string()
        .min(1, {
            message: "QUESTION IS REQUIRED."
        })
        .max(500, {
            message: "QUESTION MUST NOT EXCEED 500 CHARACTERS."
        }),

    answer: z
        .string()
        .min(1, {
            message: "ANSWER IS REQUIRED."
        })
        .max(500, {
            message: "ANSWER MUST NOT EXCEED 500 CHARACTERS."
        }),

    status: z.boolean()
})

export const CreateFRowsCommandValidator = z.object({

    type: z.literal(CREATE_FROWS_COMMAND),

    request: z.object({

        flashcardOldSessionId: z
        .string()
        .min(1, {
            message: "FLASHCARD OLD SESSION ID IS REQUIRED."
        }),

        rows: z
        .array(FlashcardRowItemRequestValidator)
        .min(1, {
            message: "AT LEAST ONE ROW IS REQUIRED."
        })
    })

})