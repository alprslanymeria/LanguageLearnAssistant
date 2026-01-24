// IMPORTS
import { z } from "zod"
import { GET_READING_BOOK_BY_ID_QUERY } from "./Query"

export const GetReadingBookByIdQueryValidator = z.object({

    type: z.literal(GET_READING_BOOK_BY_ID_QUERY),

    id: z
        .number()
        .int()
        .gt(0, {
            message: "ID MUST BE GREATER THAN 0"
        })
})