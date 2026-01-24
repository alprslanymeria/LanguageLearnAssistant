// IMPORTS
import { z } from "zod"
import { GET_WRITING_BOOK_BY_ID_QUERY } from "./Query"

export const GetWritingBookByIdQueryValidator = z.object({

    type: z.literal(GET_WRITING_BOOK_BY_ID_QUERY),

    id: z
        .number()
        .int()
        .gt(0, {
            message: "ID MUST BE GREATER THAN 0"
    })
})