// IMPORTS
import { z } from "zod"
import { CREATE_LROWS_COMMAND } from "./Command"

export const ListeningRowItemRequestValidator = z.object({

    listenedSentence: z
        .string()
        .min(1, {
            message: "LISTENED SENTENCE IS REQUIRED."
        })
        .max(2000, {
            message: "LISTENED SENTENCE MUST NOT EXCEED 2000 CHARACTERS."
        }),

    answer: z
        .string()
        .min(1, {
            message: "ANSWER IS REQUIRED."
        })
        .max(2000, {
            message: "ANSWER MUST NOT EXCEED 2000 CHARACTERS."
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

export const CreateLRowsCommandValidator = z.object({

    type: z.literal(CREATE_LROWS_COMMAND),

    request: z.object({

        listeningOldSessionId: z
        .string()
        .min(1, {
            message: "LISTENING OLD SESSION ID IS REQUIRED."
        }),

        rows: z
        .array(ListeningRowItemRequestValidator)
        .min(1, {
            message: "AT LEAST ONE ROW IS REQUIRED."
        })
    })
})