// IMPORTS
import { z } from "zod"
import { GET_DECK_WORD_BY_ID_QUERY } from "./Query"

export const GetDeckWordByIdQueryValidator = z.object({

    type: z.literal(GET_DECK_WORD_BY_ID_QUERY),
    id: z
        .number()
        .int()
        .gt(0, {
            message: "ID MUST BE GREATER THAN 0"
        })
})